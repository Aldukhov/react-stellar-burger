import {
    PARTICIPANT_FORGOT_FORM_SUBMIT,
    PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED,
    PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE,PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF
} from "../constants/forgotPasswordForm"

import { api } from '../../utils/constants';
import { checkResponse } from "../../utils/checkRes";
import { AppDispatch, AppThunk } from "../rootState/rootState";
import { ISmallMEssageApi } from "../types/apiDataTypes";


export interface IForgotFormSubmit {
    readonly type: typeof PARTICIPANT_FORGOT_FORM_SUBMIT;
}

export interface IForgotFormSubmitSuccess {
    readonly type: typeof PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS;
}

export interface IForgotFormSubmitFailed {
    readonly type: typeof PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED;
}


export interface IForgotFormSetValue {
    readonly type: typeof PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IForgotFormSubmitSuccessOff {
    readonly type: typeof PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF;
}

export type TForgotPasItemsAction = 
| IForgotFormSubmit
| IForgotFormSubmitSuccess
| IForgotFormSubmitFailed
| IForgotFormSetValue
| IForgotFormSubmitSuccessOff;

export const setParticipantFormValue = (field: string, value: string) => ({
    type: PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE,
    field,
    value
})



export const forgotPas: AppThunk<void> = () => (dispatch, getState) => {
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
    .then((data: ISmallMEssageApi) => {
        console.log("Я тут", data)
        if (data.success) {
            dispatch({
                type: PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS,
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