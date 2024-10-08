import {
    GET_USER,
    LOGOUT_USER,
    MODIFY_USER,
    SEND_AND_GET_DATA,
    DATA_FAILED,
    USER_SUCCESS,
    VARIABLE_VALUES, TProfileActions
} from "../actions/profile"

import { IProfileState } from "../types/reducerTypes"
const initialState: IProfileState = {
    form: {
        email: '',
        name: '',
        password: '',
    },
    modifyForm: {
        email: '',
        name: '',
        password: '',
    },

    resetRequest: false,
    resetFailed: false,
    resetSuccess: false,
    modifyUser: false
}



export const participantProfileReducer = (state = initialState, action: TProfileActions): IProfileState => {
    switch (action.type) {
        case SEND_AND_GET_DATA: {
            return {
                ...state,
                resetRequest: true,
                resetFailed: false
            }
        }
        case MODIFY_USER: {
            return {
                ...state,
                modifyForm: {
                    ...state.modifyForm,
                    [action.field]: action.value
                },
                modifyUser: true
            }
        }
        case GET_USER: {
            const { user} = action;
            return {
                ...state,
                form: {
                    ...state.form,
                    email: user.email,
                    name: user.name
                },
                resetSuccess: true,
                resetRequest: true,
                resetFailed: false
            }
        }
        case VARIABLE_VALUES: {
            return {
                ...state,
                modifyForm: {
                  ...state.form,
                  email: state.form.email,
                  name: state.form.name,
                  password: state.form.password,
                },
                resetSuccess: true,
                resetRequest: true,
                resetFailed: false,
                modifyUser:false
              };
        }
        case LOGOUT_USER: {
            return {
                ...state,
                form: {
                    ...initialState.form
                },
                resetSuccess: true,
                resetRequest: false

            }
        }

        case DATA_FAILED: {
            return {
                ...state,
                resetRequest: false,
                resetFailed: true
            }
        }

        case USER_SUCCESS: {
            return {
                ...state,
                resetSuccess: true,
                resetRequest: false,
                modifyUser: false
            }
        }
        default: {
            return state;
        }
    }
} 