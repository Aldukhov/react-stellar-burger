import { Navigate, useLocation, useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/utils/api';
import NewPassword from '../pages/registerPages/newPassword/newPassword';
import { PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF } from '../services/constants/forgotPasswordForm';

export const AuthprotectedRouteElement = ({ element }) => {

    const [isUserLoaded, setUserLoaded] = useState(false);
    const [success, setSuccess] = useState(false);
    const init = async () => {
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