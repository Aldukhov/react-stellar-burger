import {
    GET_ITEMS_FAILED,
    GET_ITEMS_SUCCESS, 
    TGetItemsActions
} from "../actions/ingredientsItems";
import { IBurgerState } from "../types/reducerTypes";

const initialState: IBurgerState = {
  items: {
    data: [],
    success: false,
  },
  itemsRequest: true,
  itemsFailed: false,
  error: ""
}


export const burgerItemsReducer = (state = initialState, action: TGetItemsActions): IBurgerState => {
  switch(action.type) {
  
  case GET_ITEMS_SUCCESS: {

   return {...state,itemsFailed:false,items:action.items, itemsRequest: false};
  }
  case GET_ITEMS_FAILED: {
    return {...state,itemsFailed:true, itemsRequest: false, error: action.error};
  }
  default: {
    return state;
  }
}
}