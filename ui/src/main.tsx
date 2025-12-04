import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Provider } from 'jotai';
import state from './state/state.jotai.ts';
import TaskContextProvider from './state/tasks/TaskContex.tsx';
import ApiClientContextProvider from './state/ApiContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const clientQuery = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={clientQuery}>
        <ApiClientContextProvider>
          <Provider store={state}>
            <TaskContextProvider>
              <App />
            </TaskContextProvider>
          </Provider>
        </ApiClientContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
