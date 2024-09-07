import styles from './OrderDetails.module.css'
import classNames from 'classnames'

interface IOrderDetailsProps {
	number: number
}

const OrderDetails: React.FC<IOrderDetailsProps> = ({ number }) => {
	return (
		<>
			<h1
				className={classNames(
					styles['model-number'],
					'text text_type_digits-large mb-8'
				)}
			>
				#{number}
			</h1>
			<p className={'text text_type_main-medium mb-15'}>Order ID</p>
			<div className={classNames(styles['modal-gif'], 'mb-15')}></div>
			<p className={'text text_type_main-default mb-2'}>
				Your order has been placed
			</p>
			<p className={'text text_type_main-default text_color_inactive'}>
				Stand by at the orbital station
			</p>
		</>
	)
}

export default OrderDetails
