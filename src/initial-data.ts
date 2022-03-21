export type TaskType = {id: string, content: string};
export type ColumnType = {id: string, title: string, taskIds: string[]}
export type StateType = {
  tasks: Record<string, TaskType>,
  columns: Record<string, ColumnType>,
  columnOrder: string[]
}

// columns 는 컬럼 데이터를 저장하는 용도이므로 배열로 사용하지 않는다
// columnOrder를 별도로 두어 column.id만으로 컬럼 순서 정보 저장한다
export const initialData: StateType = {
  tasks: {
    'task-1': {id: 'task-1', content: 'take out the garabge'},
    'task-2': {id: 'task-2', content: 'watch my favorite show'},
    'task-3': {id: 'task-3', content: 'charge my phone'},
    'task-4': {id: 'task-4', content: 'cook dinner'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to do',
      taskIds: ['task-1','task-2','task-3','task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'in progress',
      taskIds: []
    },
  },
  columnOrder: ['column-1', 'column-2']
}

export default initialData;