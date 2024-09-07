import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { DELETE_CONSTRUCTOR_ITEM } from '../../../../services/actions/constructor';
import { useDispatch } from '../../../../services/hooks';
import { IConstructorIngredientProps } from '../../types/burgerInterfaces';
import { IConstructorItemType } from '../../../../services/types/apiDataTypes';

const ConstructorIngredient: React.FC<IConstructorIngredientProps> = ({ styles, bunPosition, location, isLocked, extraClass, element, index, moveItem } )=> {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

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
        hover: (draggedItem: {index:number}, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex: number = draggedItem.index;
            const hoverIndex: number = index;
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            if (!clientOffset) {
                return;
            }

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if(moveItem){
            moveItem(dragIndex, hoverIndex);}

            draggedItem.index = hoverIndex;
        }


    });

    drag(drop(ref));

    const handleClose = (item: IConstructorItemType):void => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            item: item
        })
    }

    const bunText = () => {
        if(element.type==='bun') {
            return element.name + ' ' + bunPosition;
        } else {
            return element.name
        }
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
                text={element && bunText()}
                price={element && element.price}
                thumbnail={element && element.image}
                extraClass={element && extraClass}
                handleClose={() => { handleClose(element) }}
            />

        </div>
    )
};

export default ConstructorIngredient;
