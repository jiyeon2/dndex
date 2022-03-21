import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { AreaSection } from './AreaSection';
import { areaOrder, initialAreas, initialMembers } from './initial-data';
import { AreaMap, MemberMap } from './types';


const reorder = <T extends any>(list: T[], fromIndex: number, toIndex: number): T[] => {
  const copyList = Array.from(list);
  const [removed] = copyList.splice(fromIndex, 1);
  copyList.splice(toIndex, 0, removed);
  return copyList;
}


function ScoreBoard() {
  const [areas, setAreas] = useState<AreaMap>(initialAreas);
  const [members, setMembers] = useState<MemberMap>(initialMembers);
  // useEffect localstorage


  const onDragEnd = (result: DropResult) => {
    const {source, destination, draggableId} = result;
    
    // 드롭가능 영역 벗어난 경우 - 종료
    if (!destination) return; 
    // 동일 영역 & 위치에 드롭한 경우 - 종료
    // if (destination.droppableId === source.droppableId && destination.index === source.index) return;


    const sourceAreaId = source.droppableId;
    const dropAreaId = destination.droppableId;
    const memberId = draggableId;

    // 동일 영역 내에서 드롭한 경우 - 해당 영역 내에서 플레이어 리스트만 변경
    if (sourceAreaId === dropAreaId) {
      // 동일 인덱스에 드롭한경우 - 종료
      if (source.index === destination.index) return;
      const currentArea = areas[sourceAreaId];
      const newPlayerList = reorder(
        currentArea.memberIdList, 
        source.index, 
        destination.index
      );

      const newArea = {
        ...currentArea,
        memberIdList: newPlayerList
      }

      setAreas({
          ...areas,
          [newArea.id]: newArea
      });
    } else {
      // 다른 영역으로 드롭한 경우 - 플레이어 사라진 영역 처리
      const startArea = areas[sourceAreaId];
      const endArea = areas[dropAreaId];
      const startAreaMembers = Array.from(startArea.memberIdList);
      startAreaMembers.splice(source.index, 1);

      const endAreaMembers = Array.from(endArea.memberIdList);
      endAreaMembers.splice(destination.index, 0, memberId);
      
      setAreas((prevState) => ({
        ...prevState,
       [startArea.id]: {...startArea, memberIdList: startAreaMembers},
       [endArea.id]: {...endArea, memberIdList: endAreaMembers}
      }))
    }

  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>friday score board</h1>


      {areaOrder.map((areaId, index) => {
        const area = areas[areaId];

        return (
        <AreaSection key={areaId} 
          area={area}
          members={members}
          type="player"
          />
        );
      })}
      
    

    </DragDropContext>
  );
}

export default ScoreBoard;