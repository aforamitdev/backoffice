// src/context/ContextType.ts

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultContextValue,
  INITIAL_STATE,
  type AppContextType,
  type AppData,
} from './ContextType';

import { taskAtom } from './task.jotai';
import { useSetAtom } from 'jotai';
import { currentTaskAtom } from './time.jotai';
import { CLICKUP_CONFIG } from '@/constants/config';
import { getAppTask } from '@/services/clickup/task.services';

export const AppContext = createContext<AppContextType>(defaultContextValue);

// --- Provider Component ---

interface MyContextProviderProps {
  children: ReactNode;
}

/**
 * Provides the context value to its children components.
 */
export const AppContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<AppData>(INITIAL_STATE);
  const setTasks = useSetAtom(taskAtom);
  const setCurrentTask = useSetAtom(currentTaskAtom);
  // Function to update the state
  const updateState = useCallback((newState: Partial<AppData>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const contextValue = useMemo<AppContextType>(
    () => ({
      state,
      updateState,
      resetState,
    }),
    [state, updateState, resetState]
  );

  const taskFetchEvent = useEffectEvent(async () => {
    return await getAppTask();
  });

  useEffect(() => {
    taskFetchEvent()
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.error('Failed to fetch tasks:', err);
      });
  }, [taskFetchEvent]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
