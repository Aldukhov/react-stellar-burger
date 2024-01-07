import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from '../../../../services/hooks'; 
import { useLocation, Link } from 'react-router-dom';
import { ADD_ITEM} from '../../../../services/actions/modalItem';
import { IIngredientProps } from '../../types/burgerInterfaces';
import { IConstructorItemType } from '../../../../services/types/apiDataTypes';

const dateNow = (): string => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const day: number = now.getDate();
    const hours:number = now.getHours();
    const minutes: number = now.getMinutes();
    const seconds: number = now.getSeconds();


    const formattedMonth: string = String(month).padStart(2, '0');
    const formattedDay: string = String(day).padStart(2, '0');
    const formattedHours: string = String(hours).padStart(2, '0');
    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(seconds).padStart(2, '0');

    const dateTimeWithoutSeparators: string = `${year}${formattedMonth}${formattedDay}${formattedHours}${formattedMinutes}${formattedSeconds}${Math.random()}`;

    return dateTimeWithoutSeparators;

}

const Ingredient: React.FC <IIngredientProps> = ({styles,element}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { items } = useSelector(state => state.constructorItem);
    const location = useLocation();
    const dispatch = useDispatch();
    
    const [{ isDraggingMain }, dragMain] = useDrag({
        type: 'main',
        item:  { ...element, constructorType: 'main', constructorId: dateNow() },
        collect: (monitor) => ({
            isDraggingMain: monitor.isDragging(),
        }),
    });

    const [{ isDraggingBun }, dragBun] = useDrag({
        type: 'bun',
        item: { ...element, constructorType: 'bun', constructorId: dateNow() },
        collect: (monitor) => ({
            isDraggingBun: monitor.isDragging(),
        }),
    });

    const handleItemClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        dispatch({
            type: ADD_ITEM,
            item: element
        });
    };
 
    const counter = (): number => {
        const filteredArray: IConstructorItemType[] = items.filter(item => element._id === item._id);

        return filteredArray.length;
    }
    return (

        <Link
            key={element._id}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/ingredients/${element._id}`}
            // а также сохраняем в свойство background роут,
            // на котором была открыта наша модалка
            state={{ background: location }}
           
        >
            <div
                className={classNames(styles.item)}
                ref={element.type === 'bun' ? dragBun : dragMain}
                onClick={handleItemClick}

            >
                <img className={classNames(styles.item__image, 'ml-3 mr-3')} src={element.image} alt={element.name} />
                <div className={classNames(styles.item__price, 'mt-1 mb-1')}>
                    <p className={classNames('text text_type_digits-default', 'pr-2', styles.item__priceInfo)}>
                        {element.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={classNames('text text_type_main-default', styles.item__itemInfo)}>{element.name}</p>
                <Counter count={counter()} size="default" extraClass="m-1" />
            </div>
        </Link>
    );
}

export default Ingredient;