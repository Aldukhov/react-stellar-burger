import { combineReducers } from 'redux';
import { burgerItemsReducer } from "./itemsApi";


export const rootReducer = combineReducers({
    burgerItems: burgerItemsReducer,
})
