import { getCookie } from "../../services/utils/cookies";
import { newToken } from "../../services/actions/profile";
import { useDispatch } from "react-redux";
import { DATA_FAILED } from "../../services/actions/profile";

const CheckTokensAsync = async () => {
    const dispatch = useDispatch();

    if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
      try {
        await dispatch(newToken());
      } catch (error) {
        dispatch({
          type: DATA_FAILED,
        });
        return;
      }
    }
  };


  export default CheckTokensAsync