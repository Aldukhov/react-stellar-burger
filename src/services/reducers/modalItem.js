import { ADD_ITEM,DELETE_ITEM } from "../actions/modalItem";


const initialState = {
    item: null
}


export const modalItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEM: {
            return {...state, item: action.item}
        }
        case DELETE_ITEM: {
            return {...state, item: null}
        }

        default: {
            return state;
          }
    }
}