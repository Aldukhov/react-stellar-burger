import CheckTokensAsync from "../../services/utils/checkTokenAccess";
import { getCookie } from "../../services/utils/cookies";

export const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch, getState } = store;

            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsInitUser } = wsActions;

            const wsUrl = payload && payload.wsUrl;

            if (type === wsInit && !socket) {
                socket = new WebSocket(wsUrl);
            }

            if (type === wsInitUser && !socket) {
                <CheckTokensAsync/>;
               const bearerToken = getCookie('accessToken');
                const [, token] = bearerToken.split(" ");         
                socket = new WebSocket(`${wsUrl}?token=${token}`);
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
                    dispatch({ type: onClose, payload: event });
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
