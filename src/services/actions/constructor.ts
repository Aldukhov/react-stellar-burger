import { IConstructorItemType } from "../types/apiDataTypes";

const ADD_CONSTRUCTOR_ITEM:'ADD_CONSTRUCTOR_ITEM' = 'ADD_CONSTRUCTOR_ITEM';
const DELETE_CONSTRUCTOR_ITEM:'DELETE_ITEM' = 'DELETE_ITEM';
const CLEAN_ORDER: 'CLEAN_ORDER' = 'CLEAN_ORDER';
const UPDATE_LIST_ITEM_START: 'UPDATE_LIST_ITEM_START' = 'UPDATE_LIST_ITEM_START';
const UPDATE_LIST_ITEM_SUCCESS: 'UPDATE_LIST_ITEM_SUCCESS' = 'UPDATE_LIST_ITEM_SUCCESS';
const UPDATE_LIST_ITEM_ERROR:'UPDATE_LIST_ITEM_ERROR' =  'UPDATE_LIST_ITEM_ERROR';

export interface IAddConstructorItem {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly item: IConstructorItemType;
}

export interface IDeleteConstructorItem {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
    readonly item: IConstructorItemType;
}

export interface ICleanOrder {
    readonly type: typeof CLEAN_ORDER;
}

export interface IUpdateListItemStart {
    readonly type: typeof UPDATE_LIST_ITEM_START;
}

export interface IUpdateListItemSuccess {
    readonly type: typeof UPDATE_LIST_ITEM_SUCCESS;
}

export interface IUpdateListItemError {
    readonly type: typeof UPDATE_LIST_ITEM_ERROR;
}

export type TCostructorItemsAction = | IAddConstructorItem
| IDeleteConstructorItem
| ICleanOrder
| IUpdateListItemStart
| IUpdateListItemSuccess
| IUpdateListItemError;

export {ADD_CONSTRUCTOR_ITEM,DELETE_CONSTRUCTOR_ITEM,CLEAN_ORDER,UPDATE_LIST_ITEM_START,UPDATE_LIST_ITEM_SUCCESS,UPDATE_LIST_ITEM_ERROR};
