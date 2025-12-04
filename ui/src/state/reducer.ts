import type { AppTask } from '@/types/task.type';

// action type
export type ActionType = {
  type: 'SET_TASKS';
  payload: AppTask[];
};

export type TaskState = {
  tasks: AppTask[];
};

export const initialState: TaskState = {
  tasks: [],
};

function reducer(state: TaskState, action: ActionType): TaskState {
	return state
}
export default reducer