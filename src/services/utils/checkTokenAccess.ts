import { getCookie } from "./cookies";
import { newToken } from "../actions/profile"; 
import { DATA_FAILED } from "../actions/profile"; 
import { AppDispatch, AppThunk } from "../rootState/rootState";

export const checkTokensAsync = async (dispatch: AppDispatch): Promise<boolean> => {
  if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
    try {
      await newToken();
    } catch (error) {
      dispatch({
        type: DATA_FAILED,
      });
      return false; // Сигнал о неудаче
    }
  }

  return true; // Сигнал об успехе
};

