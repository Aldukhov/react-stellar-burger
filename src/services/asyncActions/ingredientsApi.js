import {GET_ITEMS_SUCCESS,GET_ITEMS_FAILED } from "../actions/ingredientsItems";
import {checkResponse} from "../../utils/checkRes";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = () => {
  return async function (dispatch) {
    try {
      const response = await fetch(apiUrl);
      const responseData = await checkResponse(response);

      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: responseData,
      });
    } catch (err) {
      dispatch({
        type: GET_ITEMS_FAILED,
        error: err,
      });
    }
  };
};
