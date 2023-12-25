import {
    PARTICIPANT_RESET_PAS_SET_VALUE,
    PARTICIPANT_RESET_PAS_SUBMIT,
    PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS,
    PARTICIPANT_RESET_PAS_SUBMIT_FAILED
} from "../constants/formResetPasConst";

import { api } from '../../utils/constants';
import { checkResponse } from "../../utils/checkRes";
export const setParticipantFormValue = (field, value) => ({
    type: PARTICIPANT_RESET_PAS_SET_VALUE,
    field,
    value
})


export const resetPas = () => (dispatch, getState) => {
    dispatch({
        type: PARTICIPANT_RESET_PAS_SUBMIT
    });

    const { password, token } = getState().resetForm.form;

    fetch(`${api}password-reset/reset`, {
        method: 'POST',

        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            password,
            token
        })

    }).then(checkResponse).then(data => {
        if (data.success) {
            dispatch({
                type: PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS,
                data
            });
        }
        else {
            dispatch({
                type: PARTICIPANT_RESET_PAS_SUBMIT_FAILED,
            });
        }
        console.log(data);
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_RESET_PAS_SUBMIT_FAILED,
        });
    })
} 