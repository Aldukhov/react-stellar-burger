import {
    PARTICIPANT_LOGIN_FORM_SET_VALUE,
    PARTICIPANT_LOGIN_FORM_SUBMIT,
    PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
    PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS
} from '../constants/login'
import { setCookie } from '../utils/cookies';
import { api } from '../../utils/constants';
import { checkResponse } from '../../utils/checkRes';
import { AppDispatch, AppThunk } from '../rootState/rootState';
import { ILoginDataApi } from '../types/apiDataTypes';

export interface ILoginSetValue {
    readonly type: typeof PARTICIPANT_LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface ILoginSubmit {
    readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT;
}

export interface ILoginSubmitFailed {
    readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED;

}

export interface ILoginSubmitSuccess {
    readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS;

}

export type TLoginItemsAction = | ILoginSetValue | ILoginSubmit | ILoginSubmitFailed | ILoginSubmitSuccess;

export const setParticipantFormValue = (field: string, value: string) => ({
    type: PARTICIPANT_LOGIN_FORM_SET_VALUE,
    field,
    value
})


export const login: AppThunk<void> = () => (dispatch, getState) => {
    dispatch({
        type: PARTICIPANT_LOGIN_FORM_SUBMIT
    });

    console.log(getState());
    const { email, password } = getState().loginForm.form;


    fetch(`${api}auth/login`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email,
            password
        })

    }).then(checkResponse).then((data: ILoginDataApi) => {
        if (data.success) {
            setCookie('accessToken', data.accessToken, 1);
            setCookie('refreshToken', data.refreshToken, 520);
            dispatch({
                type: PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS,
            });
        } else {
            dispatch({
                type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
            });
        }

    }).catch(err => {
        dispatch({
            type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
        });
    })
} 