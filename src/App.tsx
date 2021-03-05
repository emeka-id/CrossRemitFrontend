import { AppRouter } from 'components';
import { AuthProviderContainer } from 'context/auth';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderContainer>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProviderContainer>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
