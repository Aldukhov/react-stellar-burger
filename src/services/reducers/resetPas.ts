import { TResetPassActions } from "../actions/resetPas";
import { PARTICIPANT_RESET_PAS_SET_VALUE,
    PARTICIPANT_RESET_PAS_SUBMIT,
    PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS,
    PARTICIPANT_RESET_PAS_SUBMIT_FAILED } from "../constants/formResetPasConst";
import { IResetPasState } from "../types/reducerTypes";

const initialState:IResetPasState = {
    form: {
        password:'',
        token: '',
    },

    resetRequest: false,
    resetFailed: false,
    resetSuccess: false,
}



export const participantResetReducer = (state = initialState, action: TResetPassActions): IResetPasState => {
    switch(action.type) {
        case PARTICIPANT_RESET_PAS_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PARTICIPANT_RESET_PAS_SUBMIT: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }

        case  PARTICIPANT_RESET_PAS_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetRequest: false,
                resetSuccess: true
                
            }
        }

        case PARTICIPANT_RESET_PAS_SUBMIT_FAILED: {
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