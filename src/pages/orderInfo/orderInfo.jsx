import styles from "./orderInfo.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useState, useRef } from "react";

function OrderInfo() {

    const today = new Date()

    return (


        <div className={styles.orderInfo__block}>
            <p className={classNames(styles['orderInfo__order-id'], 'text text_type_digits-default mb-10')}>#1111111</p>
            <h1 className={classNames(styles.orderInfo__name, 'text text_type_main-medium mb-3')}>Black Hole Singularity острый бургер</h1>
            <p className={classNames(styles.orderInfo__status, 'text text_type_main-default mb-15')}>Выполнен</p>
            <p className={classNames(styles.orderInfo__ditails, 'text text_type_main-default mb-6')}>Состав:</p>

            <ul className={classNames(styles.orderInfo__ingredients, 'mb-10 custom-scroll')}>
                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>

                <li className={classNames(styles.orderInfo__ingredient, 'mb-6')}>
                    <div className={styles.orderInfo__info}>
                        <img src="./bun-01.png" className={classNames(styles.orderInfo__img, 'mr-4')} />
                        <p className={classNames(styles['orderInfo__ingredient_name']
                            , 'text text_type_main-default')}>
                            Филе терминатора
                        </p>
                    </div>
                    <div className={styles['price-block']}>
                        <p className={classNames(styles['orderInfo__ingredient_price'], 'text text_type_digits-default mr-2')}>1 x 200</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            </ul>

            <div className={styles.timestamp}>
                <p className={'text text_type_main-default text_color_inactive'}>
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
                {' '}i-GMT+3</p>
                <div className={styles['price-block']}>
                    <p className={classNames(styles['order__price'], 'text text_type_digits-default mr-2')}>200</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;