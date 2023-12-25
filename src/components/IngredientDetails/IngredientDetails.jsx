import styles from './IngredientDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function IngredientDetails(props) {

     const {id} = useParams();
    const { items } = useSelector(state => state.burgerItems);
    const item = items.data.find(item => item._id === id);

    return (
        (
            <>
                <div className={classNames(styles['modal-header'],)}>
                    <h1 className={classNames('text text_type_main-large')}>Детали ингредиента</h1>
                    <CloseIcon type="primary" onClick={props.onClose} />
                </div>
                <img src={item.image} className={classNames(styles['modal-img'], 'mb-4')}></img>
                <p className={classNames('text text_type_main-medium mb-8')}>{item.name}</p>
                <div className={classNames(styles['modal-nutritions'], 'mb-15')}>
                    <div className={classNames(styles['modal-nutrition'], 'mr-5')}>
                        <p className={'mb-3 text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                        <p className={'text text_type_digits-default text_color_inactive'}>{item.calories}</p>
                    </div>
                    <div className={classNames(styles['modal-nutrition'], 'mr-5')}>
                        <p className={'mb-3 text text_type_main-default text_color_inactive'}>Белки, г</p>
                        <p className={'text text_type_digits-default text_color_inactive'}>{item.proteins}</p>
                    </div>
                    <div className={classNames(styles['modal-nutrition'], 'mr-5')}>
                        <p className={'mb-3 text text_type_main-default text_color_inactive'}>Жиры, г</p>
                        <p className={'text text_type_digits-default text_color_inactive'}>{item.fat}</p>
                    </div>
                    <div className={classNames(styles['modal-nutrition'])}>
                        <p className={'mb-3 text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                        <p className={'text text_type_digits-default text_color_inactive'}>{item.carbohydrates}</p>
                    </div>
                </div>
            </>

        )

    )

}


IngredientDetails.propTypes = {
    onClose: PropTypes.func
}