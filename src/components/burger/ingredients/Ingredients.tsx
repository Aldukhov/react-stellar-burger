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