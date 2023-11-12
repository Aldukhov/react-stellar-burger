import React, { useState, useEffect, useRef } from 'react';
import styles from './food-items.module.css';
import Modal from '../../../Modal/modal';
import IngredientDetails from '../../../IngredientDetails/IngredientDetails';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RenderItemsOfType from '../../renderItemsOfType/renderItemsOfType';
import { useDispatch } from 'react-redux';
import { ADD_ITEM, DELETE_ITEM } from '../../../../services/actions/modalItem';


export default function FoodItems(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);
    const dispatch = useDispatch();

    const openModal = (element,toggleRef) => {

        toggleRef = false;
        
            dispatch({
                type: ADD_ITEM,
                item: element
            });

            setIsModalOpen(true);

    };

    const closeModal = () => {
        setIsModalOpen(false);

        dispatch({
            type: DELETE_ITEM
        });

    };


    const options = {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
    };


    const handleIntersect = (entries) => {
        let closestElement = null;
        let minDistance = Number.MAX_SAFE_INTEGER;

        entries.forEach((entry) => {
            const element = entry.target;
            const bounds = element.getBoundingClientRect();
            const topDistance = Math.abs(bounds.top);

            if (topDistance < minDistance) {
                minDistance = topDistance;
                closestElement = element;
            }
        });

        if (closestElement) {
            // closestElement - это элемент, ближайший к области наблюдения
            props.setCurrent(closestElement.id);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        if (containerRef.current) {
            // Отслеживаем каждый заголовок
            const tabs = containerRef.current.querySelectorAll('.caption');
            tabs.forEach((tab) => {
                observer.observe(tab);
            });
        }

        // Очистка ресурсов при размонтировании
        return () => {
            observer.disconnect();
        };
    }, []);



    return (
        <section className={classNames('custom-scroll', styles['food-items'])} ref={containerRef}>
            <div ref={props.scrollBun} >
                <h2 className={classNames("text text_type_main-large caption")} id='Булки'>Булки</h2>
                <section className={styles.items}>

                    <RenderItemsOfType
                        burger={'ingrediens'}
                        type='bun'
                        styles={styles}
                        openModal={openModal}
                    />

                </section>
            </div>

            <div ref={props.scrollSauce} className={"mt-10"} >
                <h2 className={classNames("text text_type_main-large caption")} id='Соусы' >Соусы</h2>
                <section className={styles.items}>

                    <RenderItemsOfType
                        burger={'ingrediens'}
                        type="sauce"
                        styles={styles}
                        openModal={openModal}
                    />
                </section>
            </div>

            <div ref={props.scrollMain} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large caption")} id="Начинки">Начинки</h2>
                <section className={styles.items}>

                    <RenderItemsOfType
                        burger={'ingrediens'}
                        type='main'
                        styles={styles}
                        openModal={openModal}
                    />
                </section>
            </div>

            {isModalOpen && (
                <>

                    <Modal onClose={closeModal} details={'ingridients'}>
                        <IngredientDetails onClose={closeModal} />
                    </Modal>
                </>
            )
            }
        </section>
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
    data: PropTypes.arrayOf(itemPropTypes),

    scrollBun: PropTypes.object,
    scrollSauce: PropTypes.object,
    scrollMain: PropTypes.object
}