import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';


function OrderDetails(props) {
    const { styles } = props;
    const { wsConnected, data } = useSelector(state => state.wsSocket)
    const orders = data.orders; 
    const location = useLocation();
   
    const [count, setCount] = useState(0);
    const { items } = useSelector(state => state.burgerItems);

    if (!orders || orders.length === 0) {
        return null;
    }


    const countItems = (ingredients) => {
        const countItem = ingredients.length - 5;

        return countItem;
    }
    
    function orderPrice(ingredients) {

        return ingredients.reduce((sum, ingredient) => {
            const foundItem = items.data.find(item => item._id === ingredient);
            return sum + foundItem.price;
        }, 0);
    }

    function imageId(itemId) {

        const foundItem = items.data.find(item => item._id === itemId);

        return foundItem.image;

    }
    {
        return <ul className={classNames(styles.list, 'custom-scroll mr-15')}>
            {orders.length !== 0 ? orders.map(item => {
                return (<Link to={`/feed/${item.number}`} state={{ background: location }}  key={item._id}>
                    <li key={item._id} className={classNames(styles.item, 'p-6 mb-4 mr-2')}>
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

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>{item.name}</h2>

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
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>
                </Link>)
            }) : null}
        </ul>
    }
}


export default OrderDetails;