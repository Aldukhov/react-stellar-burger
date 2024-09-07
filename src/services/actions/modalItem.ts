import { IBurgerItemType } from "../types/apiDataTypes";

const ADD_ITEM:'ADD_ITEM' = 'ADD_ITEM';
const DELETE_ITEM:'DELETE_ITEM' = 'DELETE_ITEM';

export interface IAddItem {
    readonly type: typeof ADD_ITEM;
    readonly item: IBurgerItemType;
}

export interface IDeleteItem {
    readonly type: typeof DELETE_ITEM;
}


export type TModalItemActions = |IAddItem | IDeleteItem;
export {ADD_ITEM,DELETE_ITEM};
