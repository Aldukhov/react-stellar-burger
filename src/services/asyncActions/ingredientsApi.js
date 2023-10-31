import { GET_ITEMS_REQUEST,GET_ITEMS_SUCCESS,GET_ITEMS_FAILED } from "../actions/itemsApi";
import checkResponse from "../../utils/checkRes";
const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';



export function fetchIngredients() {
    console.log('fetchIngredients is called 1');
    return function(dispatch) {
        console.log('fetchIngredients is called 2');
        dispatch({
            type: GET_ITEMS_REQUEST
        });

        fetch(apiUrl)
            .then(checkResponse)
            .then((responseData) => {
                dispatch({
                    type:GET_ITEMS_SUCCESS,
                    items: responseData
                })
            })
            .catch((err) => {
        
                dispatch({
                    type:GET_ITEMS_FAILED,
                    error: err
                })
            });
    }
}