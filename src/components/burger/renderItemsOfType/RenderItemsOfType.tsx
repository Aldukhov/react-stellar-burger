import { } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from '../../../services/hooks';
import Ingredient from '../ingredients/ingredient/Ingredient';
import ConstructorIngredient from '../constructor/ConstructorIngredient/ConstructorIngredient';
import React from 'react';
import { IRenderItemsProps } from '../types/burgerInterfaces';
import { UPDATE_LIST_ITEM_SUCCESS } from '../../../services/actions/constructor';
import { useCallback } from 'react';


const RenderItemsOfType: React.FC<IRenderItemsProps> = ({ burger, type, styles, data
    , location, isLocked, extraClass, bunPosition }) => {

    const dispatch = useDispatch();

    const { items } = useSelector(state => state.burgerItems) || {};

    let ingrediens: [] | React.ReactElement<any, string | React.JSXElementConstructor<any>>[] = [];

    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            dispatch({
                type: UPDATE_LIST_ITEM_SUCCESS,
                payload: { fromIndex: dragIndex, toIndex: hoverIndex },
            });

        },
        [dispatch]
    );


    if (burger === 'ingrediens') {

        const filterType = items?.data?.filter((element) => element.type === type);

        ingrediens = filterType.map((element) => {
            return (
                <Ingredient key={element._id} styles={styles} element={element} />
            )
        })
    }
    else {

        if(!data) 
        {
            return null;
        }
        const findBun = () => {
            const result = data.find((element) => element.type === 'bun')

            return result
        }
        if (data.length > 0) {
            ingrediens = data
                .filter((element) => element.constructorType === type)
                .map((element, index) => (

                    <ConstructorIngredient
                        key={element.constructorId}
                        styles={styles} location={location}
                        isLocked={isLocked} extraClass={extraClass}
                        element={element} index={findBun() ? index + 1 : index} moveItem={element.type === 'bun' ? null : moveItem}
                        bunPosition={bunPosition}

                    />
                ));
        }
    }


    return (
        <section className={styles.items}>
            {ingrediens}
        </section>
    )

}

export default RenderItemsOfType;