import React from 'react';
import styles from './constructor.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import Info from './Info/info';
import FoodItems from './Food-Items/food-items';
import PropTypes from 'prop-types';

function BurgerConstructor() {

        return (
            <section className={styles}>
                <FoodItems/>
                <Info />
            </section>
        )
}

export default BurgerConstructor;
