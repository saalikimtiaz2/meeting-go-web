import Loader from 'components/Loader';
import { useAuth } from 'context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;
