import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../services/utils/api';
import React, { ReactElement, ReactNode } from 'react';

export const ProtectedRouteElement = ({ element }: { element: ReactElement }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const init = async (): Promise<void>  => {
    const {success} = await getUser();
    setSuccess(success);
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return success ? element : <Navigate to="/login" state={{ from: location}}/>;
}