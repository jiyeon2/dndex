import React, { useState } from 'react';
import { DragDropContext, Draggable, DraggableProvidedDraggableProps, Droppable, DropResult } from 'react-beautiful-dnd';

type ItemType = {
  id: string;
  content: string
}
// fake data generator
const getItems = (count: number): ItemType[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));
// a little function to help us with reordering the result
const reorder = (list: ItemType[], startIndex: number, endIndex: number): ItemType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
 
});

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableProvidedDraggableProps["style"]) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none" as const,
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});


const ImagePreviewSection = () => {
  const [items, setItems] = useState<ItemType[]>(getItems(10));
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const _items = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(_items);
  }
  return (
   
     <DragDropContext onDragEnd={onDragEnd}>
    <div>
      미리보기 - drag and drop
    </div>
       <Droppable droppableId="droppable">
         {(provided, snapshot) => (
           <div
             {...provided.droppableProps}
             ref={provided.innerRef}
             style={{ 
               padding: grid * 2,
               width: 250, 
               ...getListStyle(snapshot.isDraggingOver)
                }}
           >
             {items.map((item, index) => (
               <Draggable key={item.id} draggableId={item.id} index={index}>
                 {(provided, snapshot) => (
                   <div
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     style={getItemStyle(
                       snapshot.isDragging,
                       provided.draggableProps.style
                     )}
                   >
                     {item.content}
                   </div>
                 )}
               </Draggable>
             ))}
             {provided.placeholder}
           </div>
         )}
       </Droppable>
     </DragDropContext>
  );
};

export default ImagePreviewSection;