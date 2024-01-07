import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './food-items.module.css';
import classNames from 'classnames';
import RenderItemsOfType from '../../renderItemsOfType/RenderItemsOfType';
import { useSelector,useDispatch } from '../../../../services/hooks'; 
import { useDrop } from 'react-dnd';

import { ADD_CONSTRUCTOR_ITEM} from '../../../../services/actions/constructor';


const FoodItems: React.FC = () => {

    const { items } = useSelector(state => state.constructorItem);
    const dispatch = useDispatch();

    const [, drop] = useDrop({
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
                    bunPosition = {'(вверх)'}
                />

            </div>

            <div className={classNames(styles['item-block'], styles['main-items'], 'custom-scroll pr-3')}>
                <RenderItemsOfType
                    data = {items}
                    burger={'const'}
                    type={'main'}
                    styles={styles}
                    extraClass={'ml-2'}
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
                    bunPosition = {'(низ)'}
                />
            </div>

        </div>
    )
}

export default FoodItems;


