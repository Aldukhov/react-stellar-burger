import { TRegisterFormActions } from "../actions/registerForm"
import {
    PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE,
    PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
    PARTICIPANT_REGISTER_FORM_SUBMIT
} from "../constants/registerForm"
import { IRegisterState } from "../types/reducerTypes"

const initialState:IRegisterState = {
    form: {
        email: '',
        password: '',
        name: '',
    },

    resetRequest: false,
    resetFailed: false,
}



export const participantRegisterReducer = (state = initialState, action: TRegisterFormActions): IRegisterState => {
    switch (action.type) {
        case PARTICIPANT_REGISTER_PAS_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PARTICIPANT_REGISTER_FORM_SUBMIT: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }

        case PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetRequest: false

            }
        }

        case PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true
            }
        }

        default: {
            return state;
        }
    }
} 