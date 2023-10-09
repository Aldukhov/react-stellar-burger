import { useState } from 'react';
import styles from './info.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Modal from '../../../Modal/modal';
import ModalOverlay from "../../../ModalOverlay/modalOverlay";
import OrderDetails from '../../../OrderDetails/OrderDetails';
export default function Info() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = () => {
        setSelectedItem('order');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);

    };

    return (

        <div className={classNames(styles.info, 'mt-10 mb-13')}>
            <div className={classNames(styles.info__price, 'mr-10')}><p className={classNames('text text_type_digits-medium', 'pr-2')}>610</p>
                <CurrencyIcon type="primary" width={36} height={36} /> </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => openModal()}>
                Оформить заказ
            </Button>

            {isModalOpen && (
                <>
                    <ModalOverlay />
                    <Modal onClose={closeModal} details={'order'}>
                        <OrderDetails onClose={closeModal} />
                    </Modal>
                </>
            )
            }
        </div>

    )
}
