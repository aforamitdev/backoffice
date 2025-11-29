import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Provider } from 'jotai';
import state from './state/state.jotai.ts';
import { AppContextProvider } from './state/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={state}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
