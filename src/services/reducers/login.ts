import { PARTICIPANT_LOGIN_FORM_SET_VALUE,
    PARTICIPANT_LOGIN_FORM_SUBMIT,
    PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
    PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS
} from '../constants/login'
import { TLoginItemsAction } from '../actions/login'
import { ILoginState } from '../types/reducerTypes'

const initialState: ILoginState = {
    form: {
        email: '',
        password: '',
    },

    resetRequest: false,
    resetFailed: false,
    resetSuccess: false,
}



export const participantLoginReducer = (state = initialState, action: TLoginItemsAction): ILoginState => {
    switch (action.type) {
        case PARTICIPANT_LOGIN_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PARTICIPANT_LOGIN_FORM_SUBMIT: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }

        case PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetSuccess: true,
                resetRequest: false

            }
        }

        case PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED: {
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