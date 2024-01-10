import { IFullOrdersFeedApi } from '../../services/types/apiDataTypes';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_DATA,
    WS_SEND_DATA,
    WS_DATA_UPDATE,
    WS_CONNECTION_START,
WS_CONNECTION_START_USER } from '../actionType/wsActionTypes'


export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetData {
    readonly type: typeof WS_GET_DATA;
    readonly payload:  IFullOrdersFeedApi;
}

export interface IWsSendData {
    readonly type: typeof  WS_SEND_DATA;
}

export interface IWsDataUpdate {
    readonly type: typeof  WS_DATA_UPDATE;
    
}

export interface IWsConnectionStart {
    readonly type: typeof  WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWsConnectionStartUser {
    readonly type: typeof  WS_CONNECTION_START_USER;
    readonly payload: string;
}

export type TWsActions = |IWsConnectionSuccess 
|IWsConnectionError
 |IWsConnectionClosed 
 |IWsGetData 
 |IWsSendData 
 |IWsDataUpdate
 |IWsConnectionStart
 |IWsConnectionStartUser;


export type TWsActionTypes = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_DATA;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_DATA;
  wsInitUser: typeof WS_CONNECTION_START_USER;
};

export const wsActions: TWsActionTypes = {
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

export const wsGetData = (data: IFullOrdersFeedApi) => {
    return {
        type: WS_GET_DATA,
        payload: data
    }
}

export const wsSendData = (data: IFullOrdersFeedApi) => {
    return {
        type: WS_SEND_DATA,
        payload: data
    }
}

export const wsDataUpdate = (data:IFullOrdersFeedApi) => {
    return {
        type: WS_DATA_UPDATE,
        payload: data
    }
}