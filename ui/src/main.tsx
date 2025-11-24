import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'jotai';
import state from './state/state.jotai.ts';
import { AppContextProvider } from './state/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={state}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Provider>
  </StrictMode>
);
