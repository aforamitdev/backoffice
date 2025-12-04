/* eslint-disable react-refresh/only-export-components */
import type React from 'react';
import { type Dispatch, type ReactNode, useEffect, useReducer } from 'react';
import createCtx from '../ctx';
import reducer, { initialState, type ActionType } from '../reducer';
import { useApiClientContext } from '../ApiContext';
import { useTaskQuery } from './hooks/useTasks';
import { useSetAtom } from 'jotai';
import { taskAtom } from './task.jotai';

export const [useTaskContext, TaskProvider] = createCtx<{
  dispatch: Dispatch<ActionType>;
}>();

const TaskContextProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  const api = useApiClientContext();

  const setTaskAtoms = useSetAtom(taskAtom);
  const { data } = useTaskQuery(api);
  useEffect(() => {
    if (data) setTaskAtoms(data);
  }, [data]);

  const [state, dispatch] = useReducer(reducer, initialState);

  return <TaskProvider value={{ ...state, dispatch }}>{children}</TaskProvider>;
};

TaskContextProvider.displayName = 'TaskContext';
export default TaskContextProvider;
