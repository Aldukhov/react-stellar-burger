import { ADD_ITEM, DELETE_ITEM } from "../actions/modalItem";


const initialState = {
    item: null,
    openPopup: false,

}


export const modalItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            return { ...state, item: action.item, openPopup: true }
        }
        case DELETE_ITEM: {
            return { ...state, item: null, openPopup: false }
        }

        default: {
            return state;
        }
    }
}