import styles from "./orderInfo.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../webSocketServices/actionType";
import { getOrderNumber } from "../../services/utils/api";
import { useSelector, useDispatch } from "../../services/hooks";
import { IOrdersApi } from "../../services/types/apiDataTypes";
import { IBurgerItemType } from "../../services/types/apiDataTypes";
interface IOrderInfo {
    description: 'modal' | 'block';
}

const OrderInfo: React.FC<IOrderInfo> = ({ description }) => {

    const { number } = useParams();
    const dispatch = useDispatch();
    const [foundElement, setFoundElement] = useState<IOrdersApi>();
    const { data } = useSelector(state => state.wsSocket)
    const { items } = useSelector(state => state.burgerItems);

    useEffect(() => {

        const fetchData = async () => {
            if (Object.keys(data.orders).length === 0) {
                dispatch({
                    type: WS_CONNECTION_START,
                    payload: {
                        wsUrl: 'wss://norma.nomoreparties.space/orders/all'
                    }
                });
                return () => {
                    dispatch({
                        type: WS_CONNECTION_CLOSED,
                    });
                }
            }
        };

        fetchData();

        if (!foundElement && Object.keys(data).length !== 0) {
            const orderElement = data.orders.find(item =>
                item.number === Number(number));
            if (!orderElement) {
                fetchOrderData();
            } else {
                setFoundElement(orderElement);
            }
        }


    }, [data]);

    const fetchOrderData = async (): Promise<void> => {

        if (!number) {
            return
        }

        const result = await getOrderNumber(number);

        if (result.success) {
            if (result.data.orders) {
                setFoundElement(result.data.orders[0]);
            } else {
                console.error('Нет номера заказа!');
            }
        } else {
            console.error('Ошибка при получении данных о заказе:', result.error);
        }
    };

    function orderPrice(ingredients: string[]): number {

        return ingredients.reduce((sum, ingredient) => {
            const foundItem = items.data.find(item => item._id === ingredient);
            if (foundItem) {
                return sum + foundItem.price;
            }
            return sum;
        }, 0);
    }

    function findElementInData(itemId: string): IBurgerItemType | undefined {

        const foundItem = items.data.find(item => item._id === itemId);

        return foundItem;

    }

    const duplicateElements = (ingredients: string[]): {
        item: string;
        count: number;
    }[] => {

        const countMap: Record<string, number> = {};
        const duplicates: { item: string; count: number }[] = [];

        ingredients.forEach((item) => {
            countMap[item] = (countMap[item] || 0) + 1;
        });

        for (const item in countMap) {
            if (countMap[item] >= 1) {
                duplicates.push({ item: item, count: countMap[item] });
            }
        }

        return duplicates;
    }

    const returnElements = (ingredients: string[]): (JSX.Element | undefined)[] => {


        const duplicates = duplicateElements(ingredients);

        if (!duplicates) { }

        const ingredientsList = duplicates.map(ingredient => {

            const item = findElementInData(ingredient.item);
            if (!item) {
                return
            }
            return (
                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')} key={item._id}>
                    <div className={styles.orderInfo__info}>
                        <img src={item.image} className={classNames(styles.orderInfo__img, 'mr-4')} alt={item.name} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            {item.name}
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>{ingredient.count} x {item.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            )

        })

        return ingredientsList;
    }


    return (
        <>
            {
                Object.keys(data).length !== 0 && foundElement ? (
                    <div className={styles[`orderInfo__${description}`]}>
                        <p className={classNames(styles['orderInfo__order-id'], 'text text_type_digits-default mb-10')}>#{foundElement.number}</p>

                        <h1 className={classNames(styles.orderInfo__name, 'text text_type_main-medium mb-3')}>{foundElement.name}</h1>
                        {(() => {
                            switch (foundElement.status) {
                                case 'done':
                                    return <p style={{ color: '#0CC' }} className={classNames(styles.orderInfo__status, 'text text_type_main-default mb-15')}>Выполнен</p>;
                                case 'pending':
                                    return <p className={classNames(styles.orderInfo__status, 'text text_type_main-default mb-15')}>Готовиться</p>;
                                case 'created':
                                    return <p className={classNames(styles.orderInfo__status, 'text text_type_main-default mb-15')}>Создан</p>;
                                default:
                                    return null;
                            }
                        })()}
                        <p className={classNames(styles.orderInfo__ditails, 'text text_type_main-default mb-6')}>Состав:</p>

                        <ul className={classNames(styles.orderInfo__ingredients, 'mb-10 custom-scroll')}>
                            {
                                returnElements(foundElement.ingredients)}
                        </ul>

                        <div className={styles.timestamp}>
                            <p className={'text text_type_main-default text_color_inactive'}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            foundElement.updatedAt
                                        )
                                    }

                                />
                                {' '}i-GMT+3</p>
                            <div className={styles['price-block']}>
                                <p className={classNames(styles['order__price'], 'text text_type_digits-default mr-2')}>
                                    {orderPrice(foundElement.ingredients)}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default OrderInfo;