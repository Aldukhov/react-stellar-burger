import styles from './orderFeed.module.css'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import {
	WS_CONNECTION_START,
	WS_CONNECTION_CLOSED,
} from '../../webSocketServices/actionType'
import OrderDetails from '../../components/OrderDetailsFeed/OrderDetails'
import { useDispatch, useSelector } from '../../services/hooks'
import { IOrdersApi } from '../../services/types/apiDataTypes'

const OrderFeed: React.FC = () => {
	const dispatch = useDispatch()
	const today = new Date()

	const { socketUser, wsConnected, data } = useSelector(state => state.wsSocket)

	useEffect(() => {
		if (socketUser) {
			dispatch({
				type: WS_CONNECTION_CLOSED,
			})
		}
	}, [])

	useEffect(() => {
		if (Object.keys(data.orders).length === 0) {
			dispatch({
				type: WS_CONNECTION_START,
				payload: {
					wsUrl: 'wss://norma.nomoreparties.space/orders/all',
				},
			})
		}
		return () => {
			dispatch({
				type: WS_CONNECTION_CLOSED,
			})
		}
	}, [socketUser])

	const ordersStatus = (s: string): (IOrdersApi | undefined)[] => {
		const statusOfOrder: (IOrdersApi | undefined)[] = data.orders.map(item => {
			if (item.status === s) {
				return item
			}
		})

		return statusOfOrder
	}

	const columnCount = (
		orderName: string,
		customStyle?: string
	): JSX.Element[] | null => {
		const statusOfOrder: (IOrdersApi | undefined)[] = ordersStatus(orderName)
		const lastTwentyOrders: (IOrdersApi | undefined)[] = statusOfOrder.slice(
			0,
			20
		)

		const ulArray: JSX.Element[] = []

		const lastTwentyOrdersFiltered = lastTwentyOrders.filter(
			order => order !== undefined
		)

		if (lastTwentyOrdersFiltered.length > 0) {
			for (let i = 0; i < lastTwentyOrdersFiltered.length; i += 10) {
				const liArray: JSX.Element[] = []

				for (
					let j = i;
					j < i + 10 && j < lastTwentyOrdersFiltered.length;
					j++
				) {
					const order = lastTwentyOrdersFiltered[j]

					if (order) {
						liArray.push(
							<li
								key={order.number}
								className={classNames('text text_type_digits-default mb-2')}
								style={{ color: customStyle }}
							>
								#{order.number}
							</li>
						)
					}
				}

				ulArray.push(
					<ul key={`ul_${i}`} className={'mr-3'}>
						{liArray}
					</ul>
				)
			}

			return ulArray
		} else {
			return null
		}
	}

	return (
		<section>
			<h1 className={classNames('text text_type_main-large mb-5')}>
				Order feed
			</h1>

			<div className={styles['order-feed']}>
				{Object.keys(data.orders).length !== 0 && !socketUser ? (
					<>
						<OrderDetails styles={styles} />

						<div className={classNames(styles.stats)}>
							<div className={classNames(styles.board, 'mb-15')}>
								<div className={'mr-9'}>
									<h2 className={'text text_type_main-medium mb-6'}>Ready:</h2>
									<div style={{ display: 'flex' }}>
										{columnCount('done', '#0CC')}
									</div>
								</div>

								<div>
									<h2 className={'text text_type_main-medium mb-6'}>
										In the works:
									</h2>
									<div style={{ display: 'flex' }}>
										{columnCount('pending', '#F2F2F3')}
									</div>
								</div>
							</div>

							<h2 className={'text text_type_main-medium'}>
								Fulfilled for all time:
							</h2>
							<p
								className={classNames(
									'text text_type_digits-large',
									styles['finished-orders-numbers']
								)}
							>
								{data.total}
							</p>

							<h2 className={'text text_type_main-medium'}>
								Done for the day:
							</h2>
							<p
								className={classNames(
									'text text_type_digits-large',
									styles['finished-orders-numbers']
								)}
							>
								{data.totalToday}
							</p>
						</div>
					</>
				) : null}
			</div>
		</section>
	)
}

export default OrderFeed
