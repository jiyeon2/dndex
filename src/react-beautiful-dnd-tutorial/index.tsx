import '@atlaskit/css-reset';
import React, { useState } from 'react';
import { DragDropContext, DropResult,DragStart, Droppable, DragUpdate, ResponderProvided } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Column from './Column';
import initialData, { ColumnType, TaskType } from './initial-data';

const Container = styled.div`
  display: flex
`;


const InnerList = React.memo((props: {
  column: ColumnType,
  taskMap: Record<string,TaskType>,
  index: number
}) => {
  const {column, taskMap, index} = props;
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} isDropDisabled={false}/>
})

function App() {
  const [state, setState] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState<number>(-1);
  


  const onDragEnd = (result: DropResult, provided: ResponderProvided ) => {
    const message = result.destination ? `You have moved the task from position ${result.source.index + 1} to ${result.destination.index + 1}` : `The task has been returned to its starting position of ${result.source.index + 1}`;
    provided.announce(message);
    setHomeIndex(-1);

    const {destination, source, draggableId, type} = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId 
      && destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      };
      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // 같은 컬럼에서 이동한 경우 - 해당컬럼 내에서 taskIds만 변경
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index,1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id] : newColumn,
        }
      };

      setState(newState);
      return;
    }

    // 다른 컬럼으로 이동
    // task가 빠진 컬럼 처리
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    // task가 추가된 컬럼 처리
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      
    }
    setState(newState);

  }

  const onDragStart = (start: DragStart,provided: ResponderProvided) => {
    provided.announce(`You have lifted the task in position ${start.source.index + 1}`);
    const _homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(_homeIndex);
  }

  const onDragUpdate = (update: DragUpdate,provided: ResponderProvided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : 'You are currently not over a droppable area';

    provided.announce(message);
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
    <Droppable droppableId='all-columns' direction="horizontal" type="column">
      {(provided) => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];

            return (
              <InnerList 
                key={column.id} 
                column={column} 
                taskMap={state.tasks} 
                index={index}/>
            )
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
      
    </DragDropContext>
    
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
