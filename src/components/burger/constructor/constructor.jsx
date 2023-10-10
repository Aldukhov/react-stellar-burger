import React from 'react';
import styles from './constructor.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import Info from './Info/info';
import FoodItems from './Food-Items/food-items';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {

        return (
            <section>
                <FoodItems data={props.data}/>
                <Info />
            </section>
        )
}

export default BurgerConstructor;


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
  
  
BurgerConstructor.protoTypes = {
    data: itemPropTypes,
}