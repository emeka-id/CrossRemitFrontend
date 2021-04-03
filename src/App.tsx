import { AppRouter } from 'components';
import { AuthProviderContainer } from 'context/auth';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProviderContainer>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProviderContainer>
      {process.env.REACT_APP_ENVIRONMENT === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
