import React from 'react';
import styles from './food-items.module.css';
import {ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function FoodItems(props) {

    return (
        <div className={styles['items-block']}>

            <div className={classNames(styles['item-block'], 'mt-25', styles['top-items'])}>

                <div className={classNames(styles.item)}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={props.data[0].image}
                        extraClass='ml-8'
                    />
                </div>

            </div>

            <div className={classNames(styles['item-block'], styles['main-items'],'custom-scroll pr-3')}>

                <div className={classNames(styles.item)}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="main"
                        isLocked={false}
                        text="Краторная булка 3213123 (верх)"
                        price={200}
                        thumbnail={props.data[0].image}
                        extraClass='mt-4 ml-2'
                    />
                </div>

            </div>


            <div className={classNames(styles['item-block'], 'mt-4', styles['bottom-items'])}>

                <div className={classNames(styles.item)}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={props.data[0].image}
                        extraClass='ml-8'
                    />
                </div>
            </div>

        </div>
    )
}


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
  

FoodItems.protoTypes = {
    data: itemPropTypes
}