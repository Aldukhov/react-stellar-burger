import { ADD_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_ITEM,CLEAN_ORDER , UPDATE_LIST_ITEM_START,UPDATE_LIST_ITEM_SUCCESS,UPDATE_LIST_ITEM_ERROR} from "../actions/constructor";

const initialState = {
    items: [],
    isUpdating: false,  
  updateError: null, 
}


export const constructorItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_ITEM: {

            let found = false;
            const updatedItems = state.items.map((item) => {

                if (item.type === 'bun' && action.item.type === 'bun') {
                    found = true;
                    return action.item;
                }

                return item;
            }
            )

            if (state.items.length === 0 || !found) {
                if(action.item.type === 'bun') {
                    updatedItems.unshift(action.item);
                } else {
                updatedItems.push(action.item);
                }
            }


            return { ...state, items: updatedItems }
        }
        case DELETE_CONSTRUCTOR_ITEM: {

            const updatedItems = state.items.filter((item)=>{
                return item !== action.item;
            })
            return { ...state, items: updatedItems }
        }

        case CLEAN_ORDER: {
            return {...state, items: []}
        }

        case UPDATE_LIST_ITEM_START: {
            // Возвращаем состояние с флагом, сигнализирующим о начале обновления
            return {
              ...state,
              isUpdating: true,
              updateError: null, // Сбрасываем предыдущие ошибки
            };
          }
      
          case UPDATE_LIST_ITEM_SUCCESS: {
            // Возвращаем состояние с обновленным массивом и флагом об успешном обновлении
            return {
              ...state,
              items: action.payload,
              isUpdating: false,
              updateError: null, // Сбрасываем ошибки
            };
          }
      
          case UPDATE_LIST_ITEM_ERROR: {
            // Возвращаем состояние с флагом об ошибке
            return {
              ...state,
              isUpdating: false,
              updateError: action.payload, // Сохраняем текст ошибки
            };
          }

        default: {
            return state;
        }

    }
}