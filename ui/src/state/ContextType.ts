export interface AppData {
  id: number;
  name: string;
}

export interface AppContextType {
  state: AppData | null;

  updateState: (newState: Partial<AppData>) => void;

  resetState: () => void;
}

export const INITIAL_STATE: AppData = {
  id: 0,
  name: 'Default Name',
};

export const defaultContextValue: AppContextType = {
  state: null,
  updateState: () => {
	console.warn('updateState was called without a provider.');
  },
  resetState: () => {
	console.warn('resetState was called without a provider.');
  },
};
