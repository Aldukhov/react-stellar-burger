import styles from "./orders.module.css";
import React, { useEffect } from "react";
import classNames from 'classnames';
import { useSelector, useDispatch } from "../../../services/hooks";
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

const Orders: React.FC = () => {

    const { data } = useSelector(state => state.wsSocket)

    const location = useLocation();

    const orders = data.orders;
    const [count, setCount] = useState<number>(0);
    const { items } = useSelector(state => state.burgerItems);

    if (!orders || orders.length === 0) {
        return null;
    }

    const countItems = (ingredients: string[]):number => {
        const countItem = ingredients.length - 5;

        return countItem;
    }

    function orderPrice(ingredients: string[]): number {

        return ingredients.reduce((sum, ingredient) => {
            const foundItem = items.data.find(item => item._id === ingredient);
            if (foundItem) {
                return sum + foundItem.price;
            }
            else return sum
        }, 0);
    }

    function imageId(itemId: string): string | undefined {

        const foundItem = items.data.find(item => item._id === itemId);

        if (foundItem) {
            return foundItem.image;
        } else return undefined
    }
    {
        return <ul className={classNames(styles.list, 'custom-scroll mr-15')}>
            {Object.keys(data).length !== 0 ? orders.map(item => {
                return (<Link to={`/profile/orders/${item.number}`} state={{ background: location }} key={item._id}>
                    <li className={classNames(styles.item, 'p-6 mb-4 mr-2')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#{item.number}</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(item.updatedAt)
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        {(() => {
                            switch (item.status) {
                                case 'done':
                                    return <p className={"text text_type_main-default mb-6"}
                                        style={{ color: '#0CC' }} >Выполнен</p>;
                                case 'pending':
                                    return <p className={"text text_type_main-default mb-6"}>Готовиться</p>;
                                case 'created':
                                    return <p className={"text text_type_main-default mb-6"}>Создан</p>;
                                default:
                                    return null;
                            }
                        })()}

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {item.ingredients.map((ingredient, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: item.ingredients.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src={imageId(ingredient)}
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && item.ingredients.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{countItems(item.ingredients)}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>

                            <div className={classNames(styles['item__price-block'])}>
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>{orderPrice(item.ingredients)}</p>
                                <CurrencyIcon type='primary' />
                            </div>
                        </div>
                    </li>
                </Link>)
            }) : null}
        </ul>
    }
}

export default Orders;