import Loader from 'components/Loader';
import { useAuth } from 'context/AuthContext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  // If loading, render a loading spinner or null
  if (loading) return <Loader />;

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
