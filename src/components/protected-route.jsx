import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../services/utils/api';

export const ProtectedRouteElement = ({ element }) => {

  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const init = async () => {
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

  return success ? element : <Navigate to="/login" replace/>;
}