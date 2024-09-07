import {
    ADD_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_ITEM,
    CLEAN_ORDER,
    UPDATE_LIST_ITEM_START,
    UPDATE_LIST_ITEM_SUCCESS,
    UPDATE_LIST_ITEM_ERROR, TCostructorItemsAction
} from "../actions/constructor";
import { IConstructorState } from "../types/reducerTypes";


const initialState: IConstructorState = {
    items: [],
    isUpdating: false,
    updateError: null,
}


export const constructorItemReducer = (state = initialState, action: TCostructorItemsAction): IConstructorState => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {

            let found: boolean = false;
            const updatedItems = state.items.map((item) => {

                if (item.type === 'bun' && action.item.type === 'bun') {
                    found = true;
                    return action.item;
                }

                return item;
            }
            )

            if (state.items.length === 0 || !found) {
                if (action.item.type === 'bun') {
                    updatedItems.unshift(action.item);
                } else {
                    updatedItems.push(action.item);
                }
            }


            return { ...state, items: updatedItems }
        }
        case DELETE_CONSTRUCTOR_ITEM: {

            const updatedItems = state.items.filter((item) => {
                return item !== action.item;
            })
            return { ...state, items: updatedItems }
        }

        case CLEAN_ORDER: {
            return { ...state, items: [] }
        }

        
        case UPDATE_LIST_ITEM_SUCCESS: {
            const { fromIndex, toIndex } = action.payload;
            const updatedItems = [...state.items];
            const [movedItem] = updatedItems.splice(fromIndex, 1);
            updatedItems.splice(toIndex, 0, movedItem);
            return {
                ...state,
                items: updatedItems,
                isUpdating: false,
                updateError: null, // Сбрасываем ошибки
            };
        }
        
        default: {
            return state;
        }

    }
}