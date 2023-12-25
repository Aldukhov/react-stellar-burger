import styles from "./ingredientInfo.module.css";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientInfo() {
    const {id} = useParams();
    const { items } = useSelector(state => state.burgerItems);
    const foundElement = items.data.find(item => item._id === id);

    return (
        <section className={styles.ingredient}>
                <h1 className={classNames('text text_type_main-large')}>Детали ингредиента</h1>
            <img src={foundElement.image} className={classNames(styles['img'], 'mb-4')}></img>
            <div className={styles['info-block']}>
            <p className={classNames('text text_type_main-medium mb-8',styles.name)}>{foundElement.name}</p>

            <div className={classNames(styles['nutritions'], 'mb-15')}>
                <div className={classNames(styles['nutrition'], 'mr-5')}>
                    <p className={'mb-3 text text_type_main-default text_color_inactive'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{foundElement.calories}</p>
                </div>
                <div className={classNames(styles['nutrition'], 'mr-5')}>
                    <p className={'mb-3 text text_type_main-default text_color_inactive'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{foundElement.proteins}</p>
                </div>
                <div className={classNames(styles['nutrition'], 'mr-5')}>
                    <p className={'mb-3 text text_type_main-default text_color_inactive'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{foundElement.fat}</p>
                </div>
                <div className={classNames(styles['nutrition'])}>
                    <p className={'mb-3 text text_type_main-default text_color_inactive'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{foundElement.carbohydrates}</p>
                </div>
            </div>
            </div>
        </section >

    );
}

export default IngredientInfo;