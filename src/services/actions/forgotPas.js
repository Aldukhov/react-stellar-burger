import {
    PARTICIPANT_FORGOT_FORM_SUBMIT,
    PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED,
    PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE
} from "../constants/forgotPasswordForm"

import { api } from '../../utils/constants';
import { checkResponse } from "../../utils/checkRes";

export const setParticipantFormValue = (field, value) => ({
    type: PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE,
    field,
    value
})



export const forgotPas = () => (dispatch, getState) => {
    dispatch({
        type: PARTICIPANT_FORGOT_FORM_SUBMIT
    });

    const { email } = getState().forgetForm.form;

    fetch(`${api}password-reset`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email
        })

    }).then(checkResponse)
    .then(data => {
        if (data.success) {
            dispatch({
                type: PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS,
                data
            });
        } else {
            dispatch({
                type: PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED,
            });
        }
        console.log(data);
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED,
        });
    })
} 