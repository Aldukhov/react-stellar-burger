import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_DATA,
    WS_SEND_DATA,
    WS_DATA_UPDATE,
    WS_CONNECTION_START,
WS_CONNECTION_START_USER } from '../actionType/wsActionTypes'


export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_DATA,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_DATA,
    wsInitUser: WS_CONNECTION_START_USER
  };


export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}

export const wsConnectionError = () => {
    return {
        type: WS_CONNECTION_ERROR
    };
}


export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    };
}

export const wsGetData = data => {
    return {
        type: WS_GET_DATA,
        payload: data
    }
}

export const wsSendData = data => {
    return {
        type: WS_SEND_DATA,
        payload: data
    }
}

export const wsDataUpdate = data => {
    return {
        type: WS_DATA_UPDATE,
        payload: data
    }
}