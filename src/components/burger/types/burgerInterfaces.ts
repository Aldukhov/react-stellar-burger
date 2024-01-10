import { IBurgerItemType, IConstructorItemType } from "../../../services/types/apiDataTypes";

export interface ITabProps {
    scrollSauce: React.RefObject<HTMLDivElement>;
    scrollBun: React.RefObject<HTMLDivElement>;
    scrollMain: React.RefObject<HTMLDivElement>; 
    tabRef: React.RefObject<HTMLDivElement>;
    current: string;
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
  }


export interface IIntersectionOptions {
   root: Element | Document | null;
  rootMargin: string;
  threshold: number | number[];
}

export interface IRenderItemsProps {
  readonly burger: string;
  readonly type: string;
  readonly styles: { [key: string]: string};
  data?: IConstructorItemType[];
  readonly location?:  "top" | "bottom" | undefined;
  isLocked?: boolean;
  extraClass?: string;
  bunPosition?: string;
}

export interface IIngredientProps {
 readonly element: IBurgerItemType; 
readonly styles: { [key: string]: string}
}

export interface IConstructorIngredientProps {
  styles:{ [key: string]: string};
  location: "top" | "bottom" | undefined;
  isLocked: boolean | undefined;
  extraClass: string | undefined;
  element: IConstructorItemType;
  index: number
  moveItem: ((dragIndex: any, hoverIndex: any) => void) | null
  bunPosition: string | undefined;
}
