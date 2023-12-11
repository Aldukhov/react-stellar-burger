import { useState, useContext } from 'react';
import styles from './info.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Modal from '../../../Modal/modal';
import OrderDetails from '../../../OrderDetails/OrderDetails';
import checkResponse from '../../../../utils/checkRes';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAN_ORDER } from '../../../../services/actions/constructor';

const api = 'https://norma.nomoreparties.space/api/orders';

export default function Info() {

    const { items } = useSelector(state => state.constructorItem);
    const dispatch = useDispatch();

    const price = items.reduce((accum,currentItem)=>{
     return accum + currentItem.price;
    },0);

    const [orderNumber, setOrderNumber] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const apiRequest = () => {
        const idsArray =  items.map((item)=>{
            return item._id;
        })

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                ingredients: idsArray
            }),
        })
        .then(checkResponse)
          .then(data => {
            console.log(data);
            setOrderNumber(data.order.number);
            openModal();
          })
          .catch(error => {
            console.error('Ошибка запроса:', error);
          });
          
    }
    const openModal = () => {

        setSelectedItem('order');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        dispatch({
            type: CLEAN_ORDER
        })
        setIsModalOpen(false);
        setSelectedItem(null);
       
    };

    return (

        <div className={classNames(styles.info, 'mt-10 mb-13')}>
            <div className={classNames(styles.info__price, 'mr-10')}><p className={classNames('text text_type_digits-medium', 'pr-2')}>{price}</p>
                <CurrencyIcon type="primary" width={36} height={36} /> </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => apiRequest()}>
                Оформить заказ
            </Button>

            {isModalOpen && (
                <>
                    <Modal onClose={closeModal} details={'order'}>
                        <OrderDetails onClose={closeModal} number={orderNumber}/>
                    </Modal>
                </>
            )
            }
        </div>

    )
}
