import styles from "./ingredientsAndConstructor.module.css";
import { useEffect } from "react";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/asyncActions/ingredientsApi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Ingredients from "../../components/burger/ingredients/ingredients";
import BurgerConstructor from "../../components/burger/constructor/constructor";

function IngredientAndConstructor() {

    const dispatch = useDispatch();
    const {itemsRequest, itemsFailed, error } = useSelector(state => state.burgerItems);


    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);


    return (
        <>
            <section className={styles.section}>

                {itemsRequest ? (
                // add loading icon
                console.log('Loading')
                ) : itemsFailed ? (
                console.log(error)
                ) : (

                <>
                    <DndProvider backend={HTML5Backend}>
                        <Ingredients />
                        <BurgerConstructor />
                    </DndProvider>
                </>
                )}

            </section>
        </>
    );
}

export default IngredientAndConstructor;