import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Player } from './Player';
import { AreaData, MemberMap } from './types';



const AreaContainer = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  & h2 {
    margin-bottom: 8px;
  }
`;

export function AreaSection(props: AreaProps) {
  const { area, members, type } = props;
  return (
    <AreaContainer>
      <h2>{area.title}</h2>
      <Area area={area} members={members} type={type}/>
      {JSON.stringify(area.memberIdList)}
    </AreaContainer>
  );
}

interface PlayerListContainerProps {
  readonly isDraggingOver?: boolean;
}

const PlayerListContainer = styled.div<PlayerListContainerProps>`
  outline-style: dashed;
  background-color: ${({isDraggingOver}) => (isDraggingOver ? 'lightblue' : 'inherit')};
`;

export interface AreaProps {
  area: AreaData,
  members: MemberMap
  type?: string
}
export function Area(props: AreaProps) {
  const {area, members, type} = props;
  return (
    <Droppable droppableId={area.id} type={type}>
      {(provided, snapshot) => (
        <PlayerListContainer
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
        >
          {area.memberIdList.map((id, index) => (
            <Player key={members[id].id} index={index} player={members[id]} />
          ))}
          {provided.placeholder}
        </PlayerListContainer>
      )}
    </Droppable>
  );
}