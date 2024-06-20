import Loader from 'components/Loader';
import { supabase } from 'helpers/supabaseClient';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        navigate('/login');
      } else {
        navigate('/dashboard');
      }
    };

    handleCallback();
  }, [navigate]);

  return <Loader />;
};

export default AuthCallback;
