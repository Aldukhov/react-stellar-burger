import {
    PARTICIPANT_LOGIN_FORM_SET_VALUE,
    PARTICIPANT_LOGIN_FORM_SUBMIT,
    PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
    PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS
} from '../constants/login'
import { setCookie } from '../utils/cookies';
import { api } from '../../utils/constants';
import { checkResponse } from '../../utils/checkRes';

export const setParticipantFormValue = (field, value) => ({
    type: PARTICIPANT_LOGIN_FORM_SET_VALUE,
    field,
    value
})


export const login = () => (dispatch, getState) => {
    dispatch({
        type: PARTICIPANT_LOGIN_FORM_SUBMIT
    });

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

    }).then(checkResponse).then(data => {
        if (data.success) {
            setCookie('accessToken', data.accessToken,20);
            setCookie('refreshToken', data.refreshToken,520);
            dispatch({
                type: PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS,
            });
        } else {
            dispatch({
                type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
            });
        }
        console.log(data);
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
        });
    })
} 