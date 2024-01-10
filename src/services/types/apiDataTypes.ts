export interface IBurgerItemsApi {
    readonly data: IBurgerItemType[];
    readonly success: boolean;
}

export interface IBurgerItemType {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number
    readonly proteins: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
}

export interface IConstructorItemType extends IBurgerItemType {
    constructorId: string
    constructorType: string
}

export interface IOrderType {
    name: string;
    order: IOrderDataType;
    success: boolean;
}

export interface IOrderDataType {
    createdAt: string;
    ingredients: IBurgerItemType[]
    name: string
    number: number
    owner: IOrderOwnerType
    price: number
    status: string
    updatedAt: string
    _id: string
}

export interface IOrderOwnerType extends IPersonDetails {
    createdAt: string
    updatedAt: string
}

export interface IPersonDetails {
    email: string
    name: string
}

export interface ILoginDataApi {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: IPersonDetails
}

export interface ISmallMEssageApi {
    success: boolean;
    message: string;
}

export interface IProfileApi {
    success?: boolean;
    user: IPersonDetails;
}

export interface INewTokenApi extends Omit <ILoginDataApi, 'user'> {

}

export interface IFullOrdersApi {
    orders:IOrdersApi[];
    total: number;
    totalToday: number;
}

export interface IOrdersApi {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt:string;
    _id: string;
}

export interface IFullOrdersFeedApi extends IFullOrdersApi{
 success: boolean
}

export interface ISocketApi {
    wsConnected: boolean;
    data: IFullOrdersFeedApi;
    wsUrl: string;
    socketUser: boolean;
}