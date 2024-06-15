import { useAuth } from 'context/AuthContext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
export default PrivateRoute;
