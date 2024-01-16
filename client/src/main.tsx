import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from '@/store';
import GlobalStyles from './styles/GlobalStyle';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToasterDisplay from './components/notifications/ToasterDisplay';
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <ToasterDisplay />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
