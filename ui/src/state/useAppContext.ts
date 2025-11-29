import { useContext } from 'react';
import type { AppContextType } from "./ContextType";
import { AppContext } from "./AppContext";


export const useMyContext = (): AppContextType => {
  const context = useContext(AppContext);


  if (context.state === null) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};