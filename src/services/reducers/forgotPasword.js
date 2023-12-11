import { PARTICIPANT_FORGOT_FORM_SUBMIT,
    PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS,
    PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED,
    PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE,PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF } from "../constants/forgotPasswordForm"

const initialState = {
    form: {
        email: ''
    },

    resetRequest: false,
    resetFailed: false,
    resetSuccess: false,
}



export const participantForgotReducer = (state = initialState, action) => {
    switch(action.type) {
        case PARTICIPANT_FORGOT_PAS_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PARTICIPANT_FORGOT_FORM_SUBMIT: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }

        case PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetSuccess: true,
                resetRequest: false
                
            }
        }

        case PARTICIPANT_FORGOT_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true
            }
        }

        case PARTICIPANT_FORGOT_FORM_SUBMIT_SUCCESS_OFF: {
            return {
                ...state,
                resetSuccess: false
            }
        }

        default: {
            return state;
        }
    }
} 