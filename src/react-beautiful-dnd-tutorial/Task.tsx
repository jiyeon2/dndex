import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from './initial-data';

interface ContainerProps {
  readonly isDragging: boolean;
  readonly isDragDisabled: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;  
  margin-bottom: 8px;
  background-color: ${props => (
    props.isDragDisabled 
    ? 'lightgrey'
    : props.isDragging 
      ? 'lightgreen' 
      : 'white'
  )};
  display: flex;

  /* width: 40px; */
  /* height: 40px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */

  &:focus {
    outline: none;
    border-color: red;
  }
`;


interface HandleProps {
  readonly isDragDisabled: boolean;
}
const Handle = styled.div<HandleProps>`
  width: 20px;
  height: 20px;
  background-color: ${({isDragDisabled}) => (isDragDisabled ? 'grey': 'orange')};
  margin-right: 8px;
`;

function Task(props: {task: TaskType, index: number}) {
  const {task, index} = props;

  const isDragDisabled = task.id === 'task-drag-disabled';

  return (
    <Draggable 
      draggableId={task.id} 
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          aria-roledescription="Press space bar to lift the task"
        >
          {/* <Handle isDragDisabled={isDragDisabled}/> */}
          {task.content}
        </Container>
      )}

    </Draggable>
    
  );
}

export default Task;