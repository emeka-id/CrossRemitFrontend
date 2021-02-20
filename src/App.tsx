
import { AppRouter } from 'components';
import { AuthProviderContainer } from 'context/auth';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <AuthProviderContainer>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProviderContainer>
  );
}

export default App;
