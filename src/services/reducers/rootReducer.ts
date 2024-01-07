import { combineReducers } from 'redux';
import { burgerItemsReducer } from './ingredientsItems';
import { modalItemReducer } from './modalItem';
import { constructorItemReducer } from './constructor';
import { participantRegisterReducer } from './registerForm';
import { participantForgotReducer } from './forgotPasword';
import { participantResetReducer } from './resetPas';
import { participantLoginReducer } from './login';
import { participantProfileReducer } from './profile';

import { wsReducer } from '../../webSocketServices/reducers/wsReducer';

export const rootReducer = combineReducers({
    burgerItems: burgerItemsReducer,
    modalItem: modalItemReducer,
    constructorItem: constructorItemReducer,
    registerForm: participantRegisterReducer,
    forgetForm: participantForgotReducer,
    resetForm: participantResetReducer,
    loginForm: participantLoginReducer,
    profile: participantProfileReducer,
    wsSocket: wsReducer
})
