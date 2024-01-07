import { IBurgerItemType, IBurgerItemsApi, IConstructorItemType } from "./apiDataTypes";

export interface IBurgerState {
    items: IBurgerItemsApi;
    itemsRequest: boolean;
    itemsFailed: boolean;
    error: string | unknown;
}

export interface IConstructorState {
    items: IConstructorItemType[];
    isUpdating: boolean;
    updateError: null | string;
}


export interface IModalState {
    item: IBurgerItemType | null;
    openPopup: boolean;
}

export interface ILoginState {
    form: ILoginFormState;
    resetRequest: boolean;
    resetFailed: boolean;
    resetSuccess: boolean;
}

export interface ILoginFormState {
    email: string;
    password: string;
}

export interface IForgotPasState {
    form: Omit<ILoginFormState, 'password'>;
    resetRequest: boolean;
    resetFailed: boolean;
    resetSuccess: boolean;
}

export interface IProfileState {
    form: IFormState;
    modifyForm:IFormState;
    resetRequest: boolean;
    resetFailed: boolean;
    resetSuccess: boolean;
    modifyUser: boolean;
}

export interface IFormState {
    email: string;
    name: string;
    password: string;
}

export interface IRegisterState {
    form: IFormState;
    resetRequest: boolean;
    resetFailed: boolean;
}

export interface IResetPasState extends Omit <IForgotPasState, 'form'> 
{
    form: {
        password: string;
        token:string;
    }
}


