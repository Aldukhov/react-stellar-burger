import styles from "./app.module.css";
import React, { useEffect, useState } from "react";
import AppHeader from "../appHeader/appHeader";
import Ingredients from "../burger/ingredients/ingredients";
import BurgerConstructor from "../burger/constructor/constructor";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';

import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/asyncActions/ingredientsApi";

function App() {
   
    const dispatch = useDispatch();
    const {items, itemsRequest, itemsFailed, error} = useSelector(state => state.burgerItems);

    useEffect(
        () => {
        dispatch(fetchIngredients());
    },[]
    );

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
                    <Ingredients data = {items.data} />
                    <BurgerConstructor data={items.data}/>
                    </>
                )}
                
            </main>
        </>
    );
}

export default App;