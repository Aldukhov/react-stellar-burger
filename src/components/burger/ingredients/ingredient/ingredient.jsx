import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const dateNow = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const dateTimeWithoutSeparators = `${year}${formattedMonth}${formattedDay}${formattedHours}${formattedMinutes}${formattedSeconds}${Math.random()}`;

    return dateTimeWithoutSeparators;

}

export default function Ingredient(props) {
    const { styles, element, openModal } = props;
    const [isDragging, setIsDragging] = useState(false);
    const { items } = useSelector(state => state.constructorItem);
    const [{ isDraggingMain }, dragMain] = useDrag({
        type: 'main',
        item: { ...element, constructorType: 'main', constructorId: dateNow() },
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

    const handleItemClick = (e) => {
        openModal(element, isDragging);
    };

    const counter = () => {
        const filteredArray = items.filter(item => element._id === item._id);

        return filteredArray.length;
    }
    return (
        <div
            className={classNames(styles.item)}
            key={element._id}
            onClick={handleItemClick}
            ref={element.type === 'bun' ? dragBun : dragMain}

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
    );
}

Ingredient.propTypes = {
    styles: PropTypes.object,
    element: PropTypes.object,
    openModal: PropTypes.func,
};
