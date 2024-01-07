import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/utils/api';
import NewPassword from '../pages/registerPages/newPassword/newPassword';
import { PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF } from '../services/constants/forgotPasswordForm';
import React, { ReactElement, ReactNode } from 'react';

 export const AuthprotectedRouteElement = ({ element }: { element: ReactElement }) => {

    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const init = async () : Promise<void>  => {
        const { success } = await getUser();
        setSuccess(!success);
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return success ? element : <Navigate to="/" replace />;
}
