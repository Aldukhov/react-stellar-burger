import { api } from '../../utils/constants';
import { getUser } from '../utils/api';
import { getCookie, deleteCookie, setCookie } from '../utils/cookies';
import { getNewToken } from '../utils/api';
export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const MODIFY_USER = 'MODIFY_USER';
export const SEND_AND_GET_DATA = 'SEND_AND_GET_DATA';
export const DATA_FAILED = 'DATA_FAILED';
export const USER_SUCCESS = 'USER_SUCCESS';
export const VARIABLE_VALUES = 'VARIABLE_VALUES'

export const setParticipantFormValue = (field, value) => ({
    type: MODIFY_USER,
    field,
    value
})


export const profile = () => async (dispatch) => {
    dispatch({
        type: SEND_AND_GET_DATA
    });

    if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
        try {
            await dispatch(newToken());
        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
            return;
        }
    }

    try {
        const { success, data } = await getUser();

        if (success) {
            dispatch({
                type: GET_USER,
                user: data.user
            });
            dispatch({
                type: VARIABLE_VALUES
            });
        } else {
            dispatch({
                type: DATA_FAILED,
            });
        }
        console.log('Profile get: ', data);
    } catch (error) {
        dispatch({
            type: DATA_FAILED,
        });
    }
};


export const profileUpdate = () => async (dispatch, getState) => {

    dispatch({
        type: SEND_AND_GET_DATA
    });
    const accessToken = getCookie('accessToken');

    if (accessToken === undefined && getCookie('refreshToken') !== undefined) {
        try {
            await dispatch(newToken()); 
            const { email, name } = getState().profile.modifyForm;

            console.log(getCookie('accessToken'));

            const response = await fetch(`${api}auth/user`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: getCookie('accessToken')
                },
                body: JSON.stringify({
                    email,
                    name
                })
            });

            const data = await response.json();

            if (data.success) {
                dispatch({
                    type: GET_USER,
                    user: data.user
                });

                dispatch({
                    type: USER_SUCCESS,
                });
            } else {
                dispatch({
                    type: DATA_FAILED,
                });
            }

            console.log('Profile update: ', data);
        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
        }
    } else {
        
        const { email, name } = getState().profile.modifyForm;

        console.log(getCookie('accessToken'));

        try {
            const response = await fetch(`${api}auth/user`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: accessToken
                },
                body: JSON.stringify({
                    email,
                    name
                })
            });

            const data = await response.json();

            if (data.success) {
                dispatch({
                    type: GET_USER,
                    user: data.user
                });

                dispatch({
                    type: USER_SUCCESS,
                });
            } else {
                dispatch({
                    type: DATA_FAILED,
                });
            }

            console.log('Profile update: ', data);
        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
        }
    }
};




export const profileLogout = () => (dispatch) => {
    dispatch({
        type: SEND_AND_GET_DATA
    });

    fetch(`${api}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.success) {
            dispatch({
                type: LOGOUT_USER,
            });
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            dispatch({
                type: USER_SUCCESS,
            });

        } else {
            dispatch({
                type: DATA_FAILED,
            });
        }
        console.log(data);
    }).catch(err => {
        dispatch({
            type: DATA_FAILED,
        });
    })

}

export const newToken = () => async (dispatch) => {
    try {
        const { success, data } = await getNewToken();


        if (success) {
            setCookie('accessToken', data.accessToken, 20);
            setCookie('refreshToken', data.refreshToken, 520);
        } else {
            dispatch({
                type: DATA_FAILED,
            });
        }
        console.log('Profile newToken: ', data);
    }
    catch (error) {
        dispatch({
            type: DATA_FAILED,
        });
    }
}