import { useState, useContext } from 'react';
import styles from './info.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Modal from '../../../Modal/Modal';
import OrderDetails from '../../../OrderDetails/OrderDetails';
import { checkResponse } from '../../../../utils/checkRes';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAN_ORDER } from '../../../../services/actions/constructor';
import { api } from '../../../../utils/constants';
import { getCookie } from '../../../../services/utils/cookies';
import { DATA_FAILED, newToken } from '../../../../services/actions/profile';
import { useNavigate } from 'react-router-dom';

export default function Info() {

    const navigate = useNavigate();
    const { items } = useSelector(state => state.constructorItem);
    const dispatch = useDispatch();

    const price = items.reduce((accum, currentItem) => {
        return accum + currentItem.price;
    }, 0);

    const [orderNumber, setOrderNumber] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const apiRequest = async () => {
        const idsArray = items.map((item) => item._id);
        const accessToken = getCookie('accessToken');
    
        if(getCookie('refreshToken') === undefined) {
            navigate('/login',{ replace: false });
        }

        if (getCookie('accessToken') === undefined && getCookie('refreshToken') !== undefined) {
            try {
                await dispatch(newToken());
            } catch (error) {
                dispatch({
                    type: DATA_FAILED,
                });
                return;
            }
        }

            try {
                const response = await fetch(`${api}orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: getCookie('accessToken'),
                    },
                    body: JSON.stringify({
                        ingredients: idsArray,
                    }),
                });
    
                const data = await checkResponse(response);
                console.log(data);
                setOrderNumber(data.order.number);
                openModal();
            } catch (error) {
                console.error('Ошибка запроса:', error);
            }
    };
    
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
                        <OrderDetails onClose={closeModal} number={orderNumber} />
                    </Modal>
                </>
            )
            }
        </div>

    )
}
