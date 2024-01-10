import React, { useState} from 'react';
import styles from './info.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Modal from '../../../Modal/Modal';
import OrderDetails from '../../../OrderDetails/OrderDetails';
import { checkResponse } from '../../../../utils/checkRes'; 
import { CLEAN_ORDER } from '../../../../services/actions/constructor';
import { api } from '../../../../utils/constants';
import { getCookie } from '../../../../services/utils/cookies';
import { DATA_FAILED, newToken } from '../../../../services/actions/profile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../../services/hooks';
import { IConstructorItemType, IOrderType } from '../../../../services/types/apiDataTypes';

const Info: React.FC = () => {

    const navigate = useNavigate();
    const { items } = useSelector(state => state.constructorItem);
    const dispatch = useDispatch();

    const price:number = items.reduce((accum: number, currentItem: IConstructorItemType): number => {
        return accum + currentItem.price;
    }, 0);

    const [orderNumber, setOrderNumber] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>('');

    const apiRequest = async () => {
        const idsArray: string[] = items.map((item) => item._id);
    
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
                        Authorization: getCookie('accessToken') || '',
                    },
                    body: JSON.stringify({
                        ingredients: idsArray,
                    }),
                });
    
               
                const data: IOrderType = await checkResponse(response); 
                setOrderNumber(data.order.number);
                openModal();
            } catch (error) {
                console.error('Ошибка запроса:', error);
            }
    };
    
    const openModal = (): void => {

        setSelectedItem('order');
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        dispatch({
            type: CLEAN_ORDER
        })
        setIsModalOpen(false);
        setSelectedItem('');

    };

    return (

        <div className={classNames(styles.info, 'mt-10 mb-13')}>
            <div className={classNames(styles.info__price, 'mr-10')}><p className={classNames('text text_type_digits-medium', 'pr-2')}>{price}</p>
                <CurrencyIcon type="primary" /> </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => apiRequest()}>
                Оформить заказ
            </Button>

            {isModalOpen && (
                <>
                    <Modal onClose={closeModal} details={'order'}>
                        <OrderDetails number={orderNumber} />
                    </Modal>
                </>
            )
            }
        </div>

    )
}


export default Info;