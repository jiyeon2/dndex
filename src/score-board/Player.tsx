import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { PlayerData } from './types';


interface PlayerItemProps {
  isDragging: boolean
}
const PlayerItem = styled.div<PlayerItemProps>`
  padding: 8px;
  background-color: ${({isDragging}) => (isDragging ? 'beige' : 'inhreit')};
  display: flex;
  align-items: center;
  & .name {
    width: 50px;
  }
  & .score-list{
    display: flex;
    justify-content: flex-start;
  }
  &:not(:last-child) {
    border-bottom: 1px dashed grey;
  }
`;

const ScoreInput = styled.input`
  margin-right: 8px;
  width: 20px;
  padding: 4px 8px;
  // input 화살표 없애기
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
  }
  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
  
`;


/** draggable 
 * 멤버 컴포넌트 */
export function Player(props: { player: PlayerData; index: number; }) {
  const { player, index } = props;

  return (
    <Draggable draggableId={player.id} index={index}>
      {(provided, snapshot) => (
        <PlayerItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className="player-row"
          data-player-id={player.id}
        >
          <p className="name"
           {...provided.dragHandleProps}
          >{player.name}</p>
          <div className="score-list">
           {player.scores.map((score,index) => (
              <ScoreInput 
                key={`${player.name}_score_${index}`} 
                defaultValue={score} 
                type="number"
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  console.log(e, player.id, index, Number(value) );
                }}
              />
           ))}
          </div>
        </PlayerItem>
      )}

    </Draggable>
  );

}
