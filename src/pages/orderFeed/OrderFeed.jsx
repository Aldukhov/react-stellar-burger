import styles from "./orderFeed.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useState, useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../webSocketServices/actionType";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "../../components/OrderDetailsFeed/OrderDetails";
import { useLocation } from "react-router-dom";

function OrderFeed() {

    const dispatch = useDispatch();
    const today = new Date();

    const { socketUser, wsConnected, data } = useSelector(state => state.wsSocket)


    useEffect(() => {
        if (socketUser) {
            dispatch({
                type: WS_CONNECTION_CLOSED,
            });
        }

    }, []);

    useEffect(() => {
        if (Object.keys(data).length === 0) {
           
            dispatch({
                type: WS_CONNECTION_START,
                payload: {
                    wsUrl: 'wss://norma.nomoreparties.space/orders/all'
                }
            });

        }
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED,
            });
        }

    }, [socketUser]);

    const ordersStatus = (s) => {
        const statusOfOrder = data.orders.map(item => {
            if (item.status === s) {
                return item;
            }
        });

        return statusOfOrder;
    }

    const columnCount = (orderName, customStyle = {}) => {
        const statusOfOrder = ordersStatus(orderName);
        const lastTwentyOrders = statusOfOrder.slice(0, 20);


        const ulArray = [];

        for (let i = 0; i < lastTwentyOrders.length; i += 10) {

            const liArray = [];

            for (let j = i; j < i + 10 && j < lastTwentyOrders.length; j++) {
                if (lastTwentyOrders[j]) {
                    liArray.push(
                        <li
                            key={lastTwentyOrders[j].number}
                            className={classNames('text text_type_digits-default mb-2')}
                            style={{ color: customStyle }}
                        >
                            #{lastTwentyOrders[j].number}
                        </li>
                    );
                }
            }


            ulArray.push(
                <ul key={`ul_${i}`} className={'mr-3'}>
                    {liArray}
                </ul>
            );
        }

        return ulArray;
    };


    return (
        <section>
            <h1 className={classNames("text text_type_main-large mb-5")}>Лента заказов</h1>

            <div className={styles['order-feed']}>
                {Object.keys(data).length !== 0 && !socketUser ? (<>

                    <OrderDetails styles={styles} />

                    <div className={classNames(styles.stats)}>
                        <div className={classNames(styles.board, 'mb-15')}>
                            <div className={'mr-9'}>
                                <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
                                <div style={{ display: 'flex' }}>
                                    {columnCount('done', '#0CC')}
                                </div>
                            </div>

                            <div>
                                <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
                                <div style={{ display: 'flex' }}>
                                    {columnCount('pending', '#F2F2F3')}
                                </div>
                            </div>

                        </div>

                        <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
                        <p className={classNames('text text_type_digits-large', styles['finished-orders-numbers'])}>{data.total}</p>

                        <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
                        <p className={classNames('text text_type_digits-large', styles['finished-orders-numbers'])}>{data.totalToday}</p>
                    </div>
                </>) : null}
            </div>
        </section >

    );
}

export default OrderFeed;