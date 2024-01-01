import {
    WS_CONNECTION_START_USER,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_DATA,
    WS_CONNECTION_START
} from '../actionType/index'


const initialState = {
    wsConnected: false,
    data: {},
    wsUrl: '',
    socketUser: false
}


export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                wsUrl: action.payload
            }
        case WS_CONNECTION_START_USER:
            return {
                ...state,
                wsUrl: action.payload,
                socketUser: true
            }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                data: [],
                wsUrl: '',
                socketUser:false
            };


        case WS_GET_DATA:

            const obj = action.payload;
            console.log(obj);


            return {
                ...state,
                data: Object.keys(state.data).length !== 0
                    ? { ...state.data, ...action.payload }
                    : { ...action.payload }
            }

        default:
            return state;
    }
}