import styles from "./ingredientsAndConstructor.module.css";
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Ingredients from "../../components/burger/ingredients/ingredients";
import BurgerConstructor from "../../components/burger/constructor/constructor";

function IngredientAndConstructor() {
    return (     
            <section className={styles.section}>
                    <DndProvider backend={HTML5Backend}>
                        <Ingredients />
                        <BurgerConstructor />
                    </DndProvider>
            </section>
    );
}

export default IngredientAndConstructor;