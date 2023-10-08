import React, { useRef, useState } from 'react';
import styles from './food-items.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../../Modal/modal';
import ModalOverlay from "../../../ModalOverlay/modalOverlay"; 
import IngredientDetails from '../../../IngredientDetails/IngredientDetails';
import classNames from 'classnames';
import PropTypes from 'prop-types';


export default function FoodItems(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        
      };

    const renderItemsOfType = (type) => {

        const filterType = props.dat.data.filter((element) => element.type === type);


        let items = filterType.map((element) => {
            return (
                <div className={classNames(styles.item)} key={element.id} onClick={() => openModal(element)}>
                    <img className={classNames(styles.item__image, 'ml-3 mr-3')} src={element.image} alt={element.name} />
                    <div className={classNames(styles.item__price, 'mt-1 mb-1')}>
                        <p className={classNames('text text_type_digits-default', 'pr-2', styles.item__priceInfo)}>
                            {element.price}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={classNames("text text_type_main-default", styles.item__itemInfo)}>
                        {element.name}
                    </p>
                    <Counter count={1} size="default" extraClass="m-1" />
                </div>
            )
        })

        return items;
    }

    return (
        <section className={classNames('custom-scroll', styles['food-items'])}>
            <div ref={props.scrollBun}>
                <h2 className={classNames("text text_type_main-large")}>Булки</h2>
                <section className={styles.items}>
                    {renderItemsOfType('bun')}
                </section>
            </div>

            <div ref={props.scrollSauce} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large")}>Соусы</h2>
                <section className={styles.items}>
                    {renderItemsOfType("sauce")}
                </section>
            </div>

            <div ref={props.scrollMain} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large")}>Начинки</h2>
                <section className={styles.items}>
                    {renderItemsOfType('main')}
                </section>
            </div>

            {isModalOpen && (
                <ModalOverlay onClick = {closeModal}>
                    <Modal onClose ={closeModal} details={'ingridients'}>
                        <IngredientDetails onClose ={closeModal} description={selectedItem}/>
                     </Modal>
                </ModalOverlay>
            )
            }
        </section>
    )
}

FoodItems.protoTypes = {
    data: PropTypes.object,
    scrollBun: PropTypes.any,
    scrollSauce: PropTypes.any,
    scrollMain: PropTypes.any
}