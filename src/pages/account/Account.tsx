import styles from './account.module.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, MouseEvent, useEffect } from 'react'
import classNames from 'classnames'
import { VARIABLE_VALUES } from '../../services/actions/profile'
import {
	setParticipantFormValue,
	profileUpdate,
	profileLogout,
	profile,
} from '../../services/actions/profile'
import { useNavigate, useParams } from 'react-router-dom'
import {
	WS_CONNECTION_START_USER,
	WS_CONNECTION_CLOSED,
} from '../../webSocketServices/actionType'
import Orders from '../../components/account/orders/Orders'
import { useSelector, useDispatch } from '../../services/hooks'

const Account: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { section } = useParams()
	const { socketUser, data } = useSelector(state => state.wsSocket)
	useEffect(() => {
		dispatch(profile())
	}, [])

	useEffect(() => {
		if (!socketUser) {
			dispatch({
				type: WS_CONNECTION_CLOSED,
			})
			dispatch({
				type: WS_CONNECTION_START_USER,
				payload: {
					wsUrl: 'wss://norma.nomoreparties.space/orders',
				},
			})

			return () => {
				dispatch({
					type: WS_CONNECTION_CLOSED,
				})
			}
		}
	}, [])

	const { email, name, password } = useSelector(
		state => state.profile.modifyForm
	)

	const { modifyUser } = useSelector(state => state.profile)

	const onIconClick = (): void => {}

	const onCancelClick = (): void => {
		dispatch({
			type: VARIABLE_VALUES,
		})
	}

	const onFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setParticipantFormValue(e.target.name, e.target.value))
	}

	const onFormSubmit = (e: MouseEvent<HTMLFormElement>): void => {
		e.preventDefault()
		dispatch(profileUpdate())
	}

	const ordersList = (): void => {
		navigate('/profile/orders', { replace: false })
	}

	const profileNavigate = (): void => {
		navigate('/profile', { replace: false })
	}

	const logout = (): void => {
		dispatch(profileLogout())
		navigate('/login', { replace: true })
	}
	return (
		<section className={styles.account}>
			<div className={'mr-15'}>
				<ul className={styles['account__block-details']}>
					<li className={classNames(styles.account__details)}>
						<button
							type='button'
							onClick={profileNavigate}
							className={classNames(
								styles.account__details_button,
								'text text_type_main-medium'
							)}
						>
							Profile
						</button>
					</li>
					<li className={classNames(styles.account__details)}>
						<button
							type='button'
							onClick={ordersList}
							className={classNames(
								styles.account__details_button,
								'text text_type_main-medium'
							)}
						>
							Order history
						</button>
					</li>
					<li className={classNames(styles.account__details)}>
						<button
							type='button'
							onClick={logout}
							className={classNames(
								styles.account__details_button,
								'text text_type_main-medium'
							)}
						>
							Exit
						</button>
					</li>
				</ul>

				{section === 'orders' ? (
					<span
						className={classNames(
							styles.caption,
							'text text_type_main-default text_color_inactive mt-20'
						)}
					>
						In this section you can view your order history
					</span>
				) : (
					<span
						className={classNames(
							styles.caption,
							'text text_type_main-default text_color_inactive mt-20'
						)}
					>
						In this section you can change your personal data
					</span>
				)}
			</div>
			{section === 'orders' ? (
				data.orders.length !== 0 ? (
					<Orders />
				) : null
			) : (
				<form onSubmit={onFormSubmit}>
					<div>
						<ul>
							<li>
								<Input
									type={'text'}
									placeholder={'Имя'}
									onChange={onFormChange}
									icon={'EditIcon'}
									value={name}
									name={'name'}
									error={false}
									onIconClick={onIconClick}
									errorText={'Ошибка'}
									size={'default'}
									extraClass='ml-1 mb-6'
								/>
							</li>
							<li>
								<Input
									type={'email'}
									placeholder={'Логин'}
									onChange={onFormChange}
									icon={'EditIcon'}
									value={email}
									name={'email'}
									error={false}
									onIconClick={onIconClick}
									errorText={'Ошибка'}
									size={'default'}
									extraClass='ml-1 mb-6'
								/>
							</li>
							<li>
								<Input
									type={'password'}
									placeholder={'Пароль'}
									onChange={onFormChange}
									icon={'EditIcon'}
									value={password}
									name={'password'}
									error={false}
									onIconClick={onIconClick}
									errorText={'Ошибка'}
									size={'default'}
									extraClass='ml-1 mb-6'
								/>
							</li>
						</ul>

						{modifyUser ? (
							<ul
								className={classNames(
									styles['account__block-details'],
									styles.edit,
									'mt-6'
								)}
							>
								<li className={classNames(styles.account__details)}>
									<button
										type='submit'
										className={classNames(
											styles.account__details_button,
											'text text_type_main-medium',
											styles.account__details_button_edit
										)}
									>
										Save
									</button>
								</li>
								<li className={classNames(styles.account__details)}>
									<button
										type='button'
										className={classNames(
											styles.account__details_button,
											'text text_type_main-medium',
											styles.account__details_button_edit
										)}
										onClick={onCancelClick}
									>
										Cancelled
									</button>
								</li>
							</ul>
						) : null}
					</div>
				</form>
			)}
		</section>
	)
}

export default Account
