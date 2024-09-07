import styles from './IngredientDetails.module.css'
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../services/hooks'

interface IIngredientProps {
	style?: string
}

const IngredientDetails: React.FC<IIngredientProps> = ({ style }) => {
	const { id } = useParams()
	const { items } = useSelector(state => state.burgerItems)
	const item = items.data.find(item => item._id === id)

	return (
		<>
			{item ? (
				<div className={classNames(styles['ingredients-block'], style)}>
					<h1 className={classNames('text text_type_main-large')}>
						Ingredient details
					</h1>

					<img
						src={item.image}
						className={classNames(styles['modal-img'], 'mb-4')}
						alt={item.name}
					></img>
					<p className={classNames('text text_type_main-medium mb-8')}>
						{item.name}
					</p>
					<div className={classNames(styles['modal-nutritions'], 'mb-15')}>
						<div className={classNames(styles['modal-nutrition'], 'mr-5')}>
							<p
								className={
									'mb-3 text text_type_main-default text_color_inactive'
								}
							>
								Calories,kcal
							</p>
							<p
								className={'text text_type_digits-default text_color_inactive'}
							>
								{item.calories}
							</p>
						</div>
						<div className={classNames(styles['modal-nutrition'], 'mr-5')}>
							<p
								className={
									'mb-3 text text_type_main-default text_color_inactive'
								}
							>
								Protein, g
							</p>
							<p
								className={'text text_type_digits-default text_color_inactive'}
							>
								{item.proteins}
							</p>
						</div>
						<div className={classNames(styles['modal-nutrition'], 'mr-5')}>
							<p
								className={
									'mb-3 text text_type_main-default text_color_inactive'
								}
							>
								Fats, g
							</p>
							<p
								className={'text text_type_digits-default text_color_inactive'}
							>
								{item.fat}
							</p>
						</div>
						<div className={classNames(styles['modal-nutrition'])}>
							<p
								className={
									'mb-3 text text_type_main-default text_color_inactive'
								}
							>
								Carbohydrates, g
							</p>
							<p
								className={'text text_type_digits-default text_color_inactive'}
							>
								{item.carbohydrates}
							</p>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default IngredientDetails
