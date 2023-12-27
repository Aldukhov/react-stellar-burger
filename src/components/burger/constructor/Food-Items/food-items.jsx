import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './food-items.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RenderItemsOfType from '../../renderItemsOfType/RenderItemsOfType';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useDispatch } from "react-redux";
import { ADD_CONSTRUCTOR_ITEM, UPDATE_LIST_ITEM_START,UPDATE_LIST_ITEM_SUCCESS,UPDATE_LIST_ITEM_ERROR} from '../../../../services/actions/constructor';


export default function FoodItems() {

    const { items } = useSelector(state => state.constructorItem);
    const dispatch = useDispatch();

    const [{ }, drop] = useDrop({
        accept: ['main', 'bun'],
        drop: (item) => {
            dispatch({
                type: ADD_CONSTRUCTOR_ITEM,
                item: item
            })
        },
    });

    useEffect(() => {
    }, [items]); 

      const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch({
                type: UPDATE_LIST_ITEM_SUCCESS,
                payload: {fromIndex: dragIndex, toIndex: hoverIndex},
              });
            
        },
        [dispatch]
    );

    return (
        <div className={styles['items-block']} ref={drop}>


            <div className={classNames(styles['item-block'], 'mt-25', styles['top-items'])}>

                <RenderItemsOfType
                    data={items}
                    burger={'const'}
                    type={'bun'}
                    location={'top'}
                    styles={styles}
                    isLocked={true}
                    extraClass={'ml-8'}
                />

            </div>

            <div className={classNames(styles['item-block'], styles['main-items'], 'custom-scroll pr-3')}>


                <RenderItemsOfType
                    data = {items}
                    burger={'const'}
                    type={'main'}
                    styles={styles}
                    extraClass={'ml-2'}
                    moveItem = {moveItem}
                />
            </div>

            <div className={classNames(styles['item-block'], 'mt-4', styles['bottom-items'])}>

                <RenderItemsOfType
                    data={items}
                    burger={'const'}
                    type={'bun'}
                    location={'bottom'}
                    styles={styles}
                    isLocked={true}
                    extraClass={'ml-8'}
                />
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


FoodItems.propTypes = {
    data: itemPropTypes
}

