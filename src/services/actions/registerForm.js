import {
    PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE,
    PARTICIPANT_REGISTER_FORM_SUBMIT,
    PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED
} from '../constants/registerForm'
import { checkResponse } from '../../utils/checkRes';
import { api } from '../../utils/constants';

export const setParticipantFormValue = (field, value) => ({
    type: PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE,
    field,
    value
})


export const register = () => (dispatch, getState) => {
    dispatch({
        type: PARTICIPANT_REGISTER_FORM_SUBMIT
    });

    const { email, password, name } = getState().registerForm.form;

    fetch(`${api}auth/register`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email,
            password,
            name
        })

    }).then(checkResponse).then(data => {
        if (data.success) {
            dispatch({
                type: PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
                data
            });
        } else {
            dispatch({
                type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
            });
        }
        console.log(data);
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
        });
    })
} 