import React, { useRef } from 'react';
import styles from './ingredients.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Categories from './Categories/categories';
import FoodItems from './Food-items/food-items';

function Ingredients(props) {
    const scrollBunRef = useRef(null);
    const scrollSauceRef = useRef(null);
    const scrollMainRef = useRef(null);

        return (
            <section className={classNames(styles.ingredients, 'mr-10')}>
                <Categories scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef}/>
                <FoodItems dat={props.data} scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef}/>
            </section>
        )
}

export default Ingredients;