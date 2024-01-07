import { store } from '../store'
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TCostructorItemsAction } from '../actions/constructor';
import { TGetItemsActions } from '../actions/ingredientsItems';
import { TLoginItemsAction } from '../actions/login';
import { TModalItemActions } from '../actions/modalItem';
import { TForgotPasItemsAction } from '../actions/forgotPas';
import { TProfileActions } from '../actions/profile';
import { TRegisterFormActions } from '../actions/registerForm';
import { TResetPassActions } from '../actions/resetPas';
import { TWsActions } from '../../webSocketServices/actions';

type TApplicationActions = 
|TCostructorItemsAction
|TGetItemsActions
|TLoginItemsAction
|TModalItemActions
|TForgotPasItemsAction
|TProfileActions
|TRegisterFormActions
|TResetPassActions
|TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 

export {};