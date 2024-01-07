import React, { useRef,useState } from 'react';
import styles from './ingredients.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Categories from './Categories/Categories';
import FoodItems from './Food-items/Food-items';
import PropTypes from 'prop-types';

const Ingredients: React.FC =( ) =>{
    const tabRef = useRef<HTMLDivElement>(null);
    const scrollBunRef = useRef<HTMLDivElement>(null);
    const scrollSauceRef = useRef<HTMLDivElement>(null);
    const scrollMainRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState<string>('Булки');

        return (
            <section className={classNames(styles.ingredients, 'mr-10')}>
                <Categories scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef} tabRef = {tabRef} current={current} setCurrent = {setCurrent}/>
                <FoodItems scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef} tabRef = {tabRef}  current={current} setCurrent = {setCurrent}/>
            </section>
        )
}

export default Ingredients;