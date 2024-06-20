import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import DarkModeToggler from 'components/DarkModeToggler';
import { AuthProvider } from 'context/AuthContext';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routers from 'routers';

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" />
      <div className="hidden">
        <DarkModeToggler />
      </div>
      <Routers />
    </AuthProvider>
  );
}

export default App;
