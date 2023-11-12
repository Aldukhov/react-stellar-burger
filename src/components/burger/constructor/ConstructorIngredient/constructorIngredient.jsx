import React, { forwardRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { DELETE_CONSTRUCTOR_ITEM } from '../../../../services/actions/constructor';
import { useDispatch } from 'react-redux';

export default function ConstructorIngredient (props ) {
    const { styles, location, isLocked, extraClass, element, index, moveItem } = props;
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [isDragging, drag] = useDrag({
        type: 'draggable-ingredient',
        item: { id: element.constructorId, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
    });

    const [{handlerId}, drop] = useDrop({
        accept: 'draggable-ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover: (draggedItem, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);

            draggedItem.index = hoverIndex;
        }


    });

    drag(drop(ref));

    const handleClose = (item) => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            item: item
        })
    }

    return (
        <div
            className={classNames(styles.item, {
                'mt-4': element && element.type !== 'bun',
            })}
            key={element.constructorId}
            ref={element.type==='bun'? null : ref} data-handler-id={element.type==='bun'? null : handlerId}
        >
            {element && element.type !== 'bun' ? <DragIcon type="primary"/> : null}
            <ConstructorElement
                type={location}
                isLocked={isLocked}
                text={element && element.name}
                price={element && element.price}
                thumbnail={element && element.image}
                extraClass={element && extraClass}
                handleClose={() => { handleClose(element) }}
                index={index}
                moveItem = {moveItem}
            />
        </div>
    )
};

ConstructorIngredient.propTypes = {
    location: PropTypes.string,
    styles: PropTypes.object,
    extraClass: PropTypes.string,
    isLocked: PropTypes.bool
};

