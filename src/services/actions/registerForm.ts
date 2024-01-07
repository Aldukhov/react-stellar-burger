import {
    PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE,
    PARTICIPANT_REGISTER_FORM_SUBMIT,
    PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED
} from '../constants/registerForm'
import { checkResponse } from '../../utils/checkRes';
import { api } from '../../utils/constants';
import { AppDispatch, AppThunk } from '../rootState/rootState';


export interface IRegisterFormSetValue {
    readonly type: typeof PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IRegisterFormSubmit {
    readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT;
}


export interface IRegisterFormSubmitSuccess {
    readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS;
}

export interface IRegisterFormSubmitFailed {
    readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED;
}

export type TRegisterFormActions = |IRegisterFormSetValue | IRegisterFormSubmit | IRegisterFormSubmitSuccess
| IRegisterFormSubmitFailed;
 
export const setParticipantFormValue = (field:string, value: string) => ({
    type: PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE,
    field,
    value
})


export const register: AppThunk = () => (dispatch: AppDispatch, getState: any) => {
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
        console.log(data);
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
    }).catch(err => {
        dispatch({
            type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
        });
    })
} 