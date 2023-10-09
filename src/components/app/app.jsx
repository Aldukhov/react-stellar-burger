import styles from "./app.module.css";
import React, { useEffect, useState } from "react";
import AppHeader from "../appHeader/appHeader";
import Ingredients from "../burger/ingredients/ingredients";
import BurgerConstructor from "../burger/constructor/constructor";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then((responseData) => {
                setData(responseData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('Ошибка при загрузке данных:', error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <AppHeader />
            <main className={classNames(styles.main, 'mb-10')}>
                {isLoading ? (
                   console.log('Loading...')
                ) : error ? (
                    console.log(error.message)
                ) : (

                    <>
                    <Ingredients data = {data.data} />
                    <BurgerConstructor data={data.data}/>
                    </>
                )}
                
            </main>
        </>
    );
}

export default App;