import { getCookie } from "./cookies";
import { newToken } from "../actions/profile"; 
import { DATA_FAILED } from "../actions/profile"; 

export const checkTokensAsync = async (dispatch) => {
  if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
    try {
      await dispatch(newToken());
    } catch (error) {
      dispatch({
        type: DATA_FAILED,
      });
      return false; // Сигнал о неудаче
    }
  }

  return true; // Сигнал об успехе
};
