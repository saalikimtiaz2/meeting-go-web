import 'react-loading-skeleton/dist/skeleton.css';

import DarkModeToggler from 'components/DarkModeToggler';
import { AuthProvider } from 'context/AuthContext';
import React from 'react';
import Routers from 'routers';

function App() {
  return (
    <AuthProvider>
      <div className="hidden">
        <DarkModeToggler />
      </div>
      <Routers />
    </AuthProvider>
  );
}

export default App;
