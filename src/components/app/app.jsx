import styles from "./app.module.css";
import { data } from "../../utils/data";
import React from "react";
import AppHeader from "../appHeader/appHeader";
import Ingredients from "../burger/ingredients/ingredients";
import BurgerConstructor from "../burger/constructor/constructor";
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';

function App() {
    
        return (
            <>
             <AppHeader/>
             <main className={classNames(styles.main, 'mb-10')}>
             <Ingredients data={data}/>
             <BurgerConstructor/>
             </main>
            </>
        );
}

export default App;