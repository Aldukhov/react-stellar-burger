import { ISocketApi } from '../../services/types/apiDataTypes'
import {
    WS_CONNECTION_START_USER,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_DATA,
    WS_CONNECTION_START
} from '../actionType/index'
import { TWsActions } from '../actions'


const initialState: ISocketApi = {
    wsConnected: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
    },
    wsUrl: '',
    socketUser: false
}


export const wsReducer = (state = initialState, action: TWsActions): ISocketApi => {
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
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0,
                },
                wsUrl: '',
                socketUser: false
            };


        case WS_GET_DATA:

            const obj = action.payload;
            return {
                ...state,
                data: Object.keys(state.data.orders).length !== 0
                    ? {
                        ...state.data,
                        success: obj.success,  
                        orders: obj.orders,
                        total: obj.total,
                        totalToday: obj.totalToday, 
                    }
                    : { ...obj }
            }

        default:
            return state;
    }
}