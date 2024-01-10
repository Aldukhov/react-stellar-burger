import { ADD_ITEM, DELETE_ITEM, TModalItemActions } from "../actions/modalItem";
import { IModalState } from "../types/reducerTypes";


const initialState: IModalState = {
    item: null,
    openPopup: false,

}


export const modalItemReducer = (state = initialState, action: TModalItemActions): IModalState => {
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