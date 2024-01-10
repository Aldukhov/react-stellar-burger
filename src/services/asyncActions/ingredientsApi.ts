import {GET_ITEMS_SUCCESS,GET_ITEMS_FAILED } from "../actions/ingredientsItems";
import {checkResponse} from "../../utils/checkRes";
import { api } from "../../utils/constants";
import { AppDispatch } from "../rootState/rootState";

export const fetchIngredients = () => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await fetch(`${api}ingredients`);
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
