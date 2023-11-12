import { combineReducers } from 'redux';
import { burgerItemsReducer } from './ingredientsItems';
import { modalItemReducer } from './modalItem';
import { constructorItemReducer } from './constructor';

export const rootReducer = combineReducers({
    burgerItems: burgerItemsReducer,
    modalItem: modalItemReducer,
    constructorItem: constructorItemReducer
})
