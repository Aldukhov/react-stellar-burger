import styles from './OrderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import PropTypes from 'prop-types';

interface IOrderDetailsProps {
number: number;
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({number}) => {

    return (
        (
            <>
                    <h1 className={classNames(styles['model-number'], 'text text_type_digits-large mb-8')}>
                        #{
                           number
                        }
                    </h1>
                    <p className={'text text_type_main-medium mb-15'}>Идентификатор заказа</p>
                    <div className={classNames(styles['modal-gif'], 'mb-15')}></div>
                    <p className={'text text_type_main-default mb-2'}>Ваш заказ начали готовить</p>
                    <p className={'text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>
            </>
        )

    )

}


export default OrderDetails;