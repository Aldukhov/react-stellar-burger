import React, { useRef,useState } from 'react';
import styles from './ingredients.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Categories from './Categories/categories';
import FoodItems from './Food-items/food-items';
import PropTypes from 'prop-types';

function Ingredients() {
    const tabRef = useRef(null);
    const scrollBunRef = useRef(null);
    const scrollSauceRef = useRef(null);
    const scrollMainRef = useRef(null);
    const [current, setCurrent] = useState('Булки');

        return (
            <section className={classNames(styles.ingredients, 'mr-10')}>
                <Categories scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef} tabRef = {tabRef} current={current} setCurrent = {setCurrent}/>
                <FoodItems scrollBun={scrollBunRef} scrollSauce = {scrollSauceRef} scrollMain = {scrollMainRef} tabRef = {tabRef}  current={current} setCurrent = {setCurrent}/>
            </section>
        )
}

export default Ingredients;

const itemPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  });
  
  

  
  Ingredients.propTypes = {
    data: PropTypes.arrayOf(itemPropTypes)
}