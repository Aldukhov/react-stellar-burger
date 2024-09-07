import { Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/utils/api';
import  { ReactElement } from 'react';

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
