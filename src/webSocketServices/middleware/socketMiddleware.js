import { getCookie } from "../../services/utils/cookies";
import { checkTokensAsync } from '../../services/utils/checkTokenAccess'

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => async action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsInitUser } = wsActions;

      let wsUrlMiddle = payload && payload.wsUrl;


      if(socket && onClose) {
        socket = null;
          console.log('onCloseCondition');
      }
      if (type === wsInit && !socket) {
        socket = new WebSocket(wsUrlMiddle);
      }

    

      if (type === wsInitUser && !socket) {
        const tokensCheckResult = await checkTokensAsync(dispatch);
        if (!tokensCheckResult) {
          return;
        }
        const bearerToken = getCookie('accessToken');
        const [, token] = bearerToken.split(" ");         
        socket = new WebSocket(`${wsUrlMiddle}?token=${token}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
          console.log('onOpen');
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
          console.log('onError');
        };

        socket.onmessage = event => {
          const { data } = event;
          const parcedData = JSON.parse(data);
          const { success, ...restParcedData } = parcedData;
          console.log(parcedData);
          dispatch({ type: onMessage, payload: restParcedData });
          console.log('onMessage');
        };

        socket.onclose = event => {
          dispatch({ type: onClose});
          console.log('onClose');
        };
      }

      if (socket && type === wsSendMessage) {
        const message = { ...payload };
        socket.send(JSON.stringify(message));
        console.log('onSend');
      }

      next(action);
    };
  };
};
