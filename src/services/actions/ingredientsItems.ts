import { IBurgerItemsApi } from "../types/apiDataTypes";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';


export interface IGetItemsRequest {
    readonly type: typeof GET_ITEMS_REQUEST;
}


export interface IGetItemsSuccess {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly items: IBurgerItemsApi;
}

export interface IGetItemsFailed {
    readonly type: typeof GET_ITEMS_FAILED;
    readonly error: Error | unknown;
}

export type TGetItemsActions = | IGetItemsRequest 
| IGetItemsSuccess | IGetItemsFailed;