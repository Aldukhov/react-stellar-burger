export interface ITabProps {
    scrollSauce: React.RefObject<HTMLDivElement>;
    scrollBun: React.RefObject<HTMLDivElement>;
    scrollMain: React.RefObject<HTMLDivElement>; 
    tabRef: React.RefObject<HTMLDivElement>;
    current: string;
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
  }

 export {};