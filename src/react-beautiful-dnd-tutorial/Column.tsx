import React from 'react';
import styled from 'styled-components';
import { Droppable, DroppableProvided, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { ColumnType, TaskType } from './initial-data';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

interface TaskListProps {
  readonly isDraggingOver: boolean;
}
const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'inherit'};
  transition: background-color 0.2s ease;
  min-height: 100px;
  width: 220px;
  flex-grow:1;
`;

const InnerList = React.memo(function InnerList(props: {tasks: TaskType[]}) {
  const {tasks} = props;
  return (
    <>
     {tasks.map((task,index) => <Task key={task.id} task={task} index={index}/>)} 
    </>
  )
})


function Column(props: {
  column: ColumnType,
  tasks: TaskType[],
  isDropDisabled: boolean,
  index: number
}) {

  const {column, tasks, isDropDisabled, index} = props;

    return (
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
            <Title
              {...provided.dragHandleProps}
            >{column.title}</Title>
            {/* droppable 의 children은 function 형태 => react-dnd는 데이터만 제공하고, 렌더링되는 ui는 사용자가 알아서 하도록 */}
            <Droppable droppableId={column.id}
              type="task"
              // direction="horizontal"
              // drop 제한하기 1 : 같은 타입에만 drop 가능
              // type={column.id === 'column-3' ? 'done' : 'active'}
              // drop 제한하기 2 : isDropDisabled
              isDropDisabled={isDropDisabled}
            >
              {
                (provided: DroppableProvided, snapshot) => (
                 
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                     <InnerList tasks={tasks}/>
                   

                    {/* 드래그 중에 비는 공간 채우고 있을 돔 엘리먼트 */}
                    {provided.placeholder}
                  </TaskList>
                )
              }
              
            </Droppable>
          </Container>
        )}

      </Draggable>
  );
}

export default Column;