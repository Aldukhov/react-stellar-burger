import { api } from '../../utils/constants';
import { getUser } from '../utils/api';
import { getCookie, deleteCookie, setCookie } from '../utils/cookies';
import { getNewToken } from '../utils/api';
import { checkResponse } from '../../utils/checkRes';
import { AppDispatch, AppThunk } from '../rootState/rootState';
import { ILoginFormState } from '../types/reducerTypes';
import { ISmallMEssageApi, IProfileApi, INewTokenApi } from '../types/apiDataTypes';
import { ThunkAction } from 'redux-thunk';

export const GET_USER: 'GET_USER' = 'GET_USER';
export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';
export const MODIFY_USER: 'MODIFY_USER' = 'MODIFY_USER';
export const SEND_AND_GET_DATA: 'SEND_AND_GET_DATA' = 'SEND_AND_GET_DATA';
export const DATA_FAILED: 'DATA_FAILED' = 'DATA_FAILED';
export const USER_SUCCESS: 'USER_SUCCESS' = 'USER_SUCCESS';
export const VARIABLE_VALUES: 'VARIABLE_VALUES' = 'VARIABLE_VALUES';


export interface IGetUser {
    readonly type: typeof GET_USER;
    readonly user: any;
}

export interface ILogoutUser {
    readonly type: typeof LOGOUT_USER;
}

export interface IModifyUser {
    readonly type: typeof MODIFY_USER;
    readonly field: string;
    readonly value: string;
}

export interface ISendAndGetData {
    readonly type: typeof SEND_AND_GET_DATA;
}


export interface IDataFailed {
    readonly type: typeof DATA_FAILED;
}

export interface IUserSuccess {
    readonly type: typeof USER_SUCCESS;
}

export interface IVariableValues {
    readonly type: typeof VARIABLE_VALUES;
}


export type TProfileActions =
    | IGetUser
    | ILogoutUser
    | IModifyUser
    | ISendAndGetData
    | IDataFailed
    | IUserSuccess
    | IVariableValues;

export const setParticipantFormValue = (field: string, value: string) => ({
    type: MODIFY_USER,
    field,
    value
})


export const profile: AppThunk = () => async (dispatch) => {
    dispatch({
        type: SEND_AND_GET_DATA
    });

    if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
        try {
            await newToken();
        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
            return;
        }
    }

    try {
        const { success, data }: { success: boolean, data?: IProfileApi } = await getUser();

        if (success && data) {
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


export const profileUpdate: AppThunk = () => async (dispatch, getState) => {

    dispatch({
        type: SEND_AND_GET_DATA
    });
    const accessToken = getCookie('accessToken');

    if (accessToken === undefined && getCookie('refreshToken') !== undefined) {
        try {
            await newToken();
            const { email, name } = getState().profile.modifyForm;

            const response = await fetch(`${api}auth/user`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: getCookie('accessToken') || ''
                },
                body: JSON.stringify({
                    email,
                    name
                })
            });

            const data: IProfileApi = await checkResponse(response);

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

        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
        }
    } else {
        const { email, name } = getState().profile.modifyForm;

        try {
            const response = await fetch(`${api}auth/user`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: accessToken || ''
                },
                body: JSON.stringify({
                    email,
                    name
                })
            });

            const data: IProfileApi = await checkResponse(response);

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


        } catch (error) {
            dispatch({
                type: DATA_FAILED,
            });
        }
    }
};




export const profileLogout: AppThunk = () => (dispatch) => {
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
    }).then((data: ISmallMEssageApi) => {

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
    }).catch(err => {
        dispatch({
            type: DATA_FAILED,
        });
    })

}


  export const newToken: AppThunk = () => async (dispatch) => {
    try {
        const { success, data }: { success: boolean, data?: INewTokenApi } = await getNewToken();

        if (success && data) {
            setCookie('accessToken', data.accessToken, 20);
            setCookie('refreshToken', data.refreshToken, 520);
            return data;
        } else {
            dispatch({
                type: DATA_FAILED,
            });
            return { accessToken: '',
                refreshToken: '',
                success: false,};
        }
    } catch (error) {
        dispatch({
            type: DATA_FAILED,
        });
        return { accessToken: '',
                refreshToken: '',
                success: false,};
    }
};

