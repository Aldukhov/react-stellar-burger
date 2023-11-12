import styles from "./app.module.css";
import { useEffect} from "react";
import AppHeader from "../appHeader/appHeader";
import Ingredients from "../burger/ingredients/ingredients";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import BurgerConstructor from "../burger/constructor/constructor";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/asyncActions/ingredientsApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    
    const dispatch = useDispatch();
    const {items, itemsRequest, itemsFailed, error} = useSelector(state => state.burgerItems);


    useEffect(() => {
        dispatch(fetchIngredients());
    },[]);


    return (
        <>
            <AppHeader />
            <main className={classNames(styles.main, 'mb-10')}>
                {itemsRequest ? (
                   console.log('Loading...')
                ) : itemsFailed ? (
                    console.log(error)
                ) : (
                     
                    <>
                    <DndProvider backend={HTML5Backend}>
                    <Ingredients/>
                  <BurgerConstructor/>
                  </DndProvider>
                    </>
                )}
                
            </main>
        </>
    );
}

export default App;