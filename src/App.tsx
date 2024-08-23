import React from 'react';
import { Router } from './Router';
import { AuthProvider } from './app/@core/contexts/Auth';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
