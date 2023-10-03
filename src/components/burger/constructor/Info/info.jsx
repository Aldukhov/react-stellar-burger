import React from 'react';
import styles from './info.module.css';
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';

export default function Info() {

    return (

        <div className={classNames(styles.info, 'mt-10 mb-13')}>
            <div className={classNames(styles.info__price, 'mr-10')}><p className={classNames('text text_type_digits-medium', 'pr-2')}>610</p>
                <CurrencyIcon type="primary" width={36} height={36} /> </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>

    )
}
