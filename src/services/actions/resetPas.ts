import {
    PARTICIPANT_RESET_PAS_SET_VALUE,
    PARTICIPANT_RESET_PAS_SUBMIT,
    PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS,
    PARTICIPANT_RESET_PAS_SUBMIT_FAILED
} from "../constants/formResetPasConst";

import { api } from '../../utils/constants';
import { checkResponse } from "../../utils/checkRes";
import { AppDispatch, AppThunk } from "../rootState/rootState";
import { ISmallMEssageApi } from "../types/apiDataTypes";


export interface IResetPassSetValue {
    readonly type: typeof PARTICIPANT_RESET_PAS_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IResetPassSubmit {
    readonly type: typeof PARTICIPANT_RESET_PAS_SUBMIT;
}

export interface IResetPassSubmitSuccess {
    readonly type: typeof PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS;
}

export interface IResetPassSubmitFailed {
    readonly type: typeof PARTICIPANT_RESET_PAS_SUBMIT_FAILED;
}

export type TResetPassActions = 
|IResetPassSetValue 
| IResetPassSubmit
 | IResetPassSubmitSuccess 
 | IResetPassSubmitFailed;

export const setParticipantFormValue = (field: string, value: string) => ({
    type: PARTICIPANT_RESET_PAS_SET_VALUE,
    field,
    value
})


export const resetPas:AppThunk = () => (dispatch: AppDispatch, getState: any) => {
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

    }).then(checkResponse).then((data: ISmallMEssageApi) => {
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
        
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_RESET_PAS_SUBMIT_FAILED,
        });
    })
} 