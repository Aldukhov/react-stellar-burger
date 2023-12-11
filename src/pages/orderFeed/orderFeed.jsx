import styles from "./orderFeed.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useState, useRef } from "react";

function OrderFeed() {

    const data = [1, 2, 3, 4, 5, 7, 8, 9];
    const today = new Date();

    const [count, setCount] = useState(() => data.length - 5);

    return (
        <section>
            <h1 className={classNames("text text_type_main-large mb-5")}>Лента заказов</h1>

            <div className={styles['order-feed']}>
                <ul className={classNames(styles.list, 'custom-scroll mr-15')}>

                    <li className={classNames(styles.item, 'p-6 mb-4 mr-2')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>

                    <li className={classNames(styles.item, 'p-6 mb-4')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>


                    <li className={classNames(styles.item, 'p-6 mb-4')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>

                    <li className={classNames(styles.item, 'p-6 mb-4')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>

                    <li className={classNames(styles.item, 'p-6 mb-4')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>

                    <li className={classNames(styles.item, 'p-6 mb-4')}>
                        <div className={classNames(styles['item__order-details'], 'mb-6')}>
                            <p className={classNames(styles.item__id, "text text_type_digits-default")}>#101231</p>
                            <p
                                className={classNames(styles.item__date,
                                    "text text_type_main-default text_color_inactive")}>
                                <FormattedDate
                                    date={
                                        new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate(),
                                            today.getHours(),
                                            today.getMinutes() - 1,
                                            0,
                                        )
                                    }

                                />
                                {' '}i-GMT+3
                            </p>

                        </div>

                        <h2 className={classNames(styles.item__name, "text text_type_main-medium mb-6")}>Tерминатор</h2>

                        <div className={classNames(styles.item__details)}>
                            <div className={classNames(styles.item__imges)}>
                                {data.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div key={index} className={styles.imageContainer} style={{ zIndex: data.length - index - 1 }}>
                                                {index <= 5 && (
                                                    <img
                                                        src="./bun-01.png"
                                                        alt={`item ${index + 1}`}
                                                        className={classNames(styles.item__img)}
                                                    />
                                                )}

                                                {index === 5 && data.length - 1 > index && (
                                                    <div className={styles.overlay}>
                                                        <p className={"text text_type_main-default"}>+{count}</p>
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
                                <p className={classNames(styles[styles.item__price], "text text_type_digits-default mr-2")}>500</p>
                                <CurrencyIcon />
                            </div>
                        </div>
                    </li>
                </ul>



                <div className={classNames(styles.stats)}>
                    <div className={classNames(styles.board,'mb-15')}>
                        <div className={'mr-9'}>
                            <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
                            <ul>
                                <li className={classNames('text text_type_digits-default mb-2')
                                } style={{ color: '#0CC' }}>035555</li>
                                <li className={classNames('text text_type_digits-default mb-2')
                                } style={{ color: '#0CC' }}>035555</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
                            <ul>
                                <li className={classNames('text text_type_digits-default mb-2')
                                }>035555</li>
                                <li className={classNames('text text_type_digits-default mb-2')
                                }>035555</li>
                            </ul>
                        </div>

                    </div>

                    <h2  className={'text text_type_main-medium'}>Выполнено за все время:</h2>
                    <p className={classNames('text text_type_digits-large',styles['finished-orders-numbers'])}>2888888</p>

                    <h2  className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
                    <p className={classNames('text text_type_digits-large',styles['finished-orders-numbers'])}>2888888</p>
                </div>

            </div>
        </section >

    );
}

export default OrderFeed;