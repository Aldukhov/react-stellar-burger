import {GET_ITEMS_SUCCESS,GET_ITEMS_FAILED } from "../actions/ingredientsItems";
import checkResponse from "../../utils/checkRes";
const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';



export const  fetchIngredients = () => {
    return function(dispatch) {
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