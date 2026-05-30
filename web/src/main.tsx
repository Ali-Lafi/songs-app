import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './styles.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
  const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
    </QueryClientProvider>,
);
