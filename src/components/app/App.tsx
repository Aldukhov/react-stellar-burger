import styles from './app.module.css'
import React, { useEffect } from 'react'
import AppHeader from '../appHeader/AppHeader'
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import { fetchIngredients } from '../../services/asyncActions/ingredientsApi'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { DELETE_ITEM } from '../../services/actions/modalItem'
import { useSelector, useDispatch } from '../../services/hooks'
import Account from '../../pages/account/Account'
import Registration from '../../pages/registerPages/registration/registration'
import SignIn from '../../pages/registerPages/signIn/signIn'
import ForgotPassword from '../../pages/registerPages/forgotPassword/forgotPassword'
import NewPassword from '../../pages/registerPages/newPassword/newPassword'
import OrderInfo from '../../pages/orderInfo/OrderInfo'
import OrderFeed from '../../pages/orderFeed/OrderFeed'
import IngredientAndConstructor from '../../pages/ingredientsAndConstructor/IngredientsAndConstructor'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

import { ProtectedRouteElement } from '../protected-route'
import { AuthprotectedRouteElement } from '../AuthProtectedRoute'

const App: React.FC = () => {
	useEffect(() => {
		dispatch(fetchIngredients())
	}, [])

	let location = useLocation()
	const navigate = useNavigate()
	const background = location.state && location.state.background
	const dispatch = useDispatch()

	const { itemsRequest, itemsFailed, error } = useSelector(
		state => state.burgerItems
	)

	const closeModal = (): void => {
		dispatch({
			type: DELETE_ITEM,
		})

		navigate(-1)
	}

	return (
		<>
			{itemsRequest ? (
				// add loading icon
				console.log('Loading')
			) : itemsFailed ? (
				console.log(error)
			) : (
				<>
					<AppHeader />
					<main className={classNames(styles.main, 'mb-10')}>
						<Routes location={background || location}>
							<Route path='/' element={<IngredientAndConstructor />} />
							<Route
								path='/login'
								element={<AuthprotectedRouteElement element={<SignIn />} />}
							/>
							<Route
								path='/register'
								element={
									<AuthprotectedRouteElement element={<Registration />} />
								}
							/>
							<Route
								path='/forgot-password'
								element={
									<AuthprotectedRouteElement element={<ForgotPassword />} />
								}
							/>
							<Route
								path='/reset-password'
								element={
									<AuthprotectedRouteElement element={<NewPassword />} />
								}
							/>
							<Route
								path='/profile'
								element={<ProtectedRouteElement element={<Account />} />}
							/>
							<Route
								path='/profile/:section?'
								element={<ProtectedRouteElement element={<Account />} />}
							/>
							<Route
								path='/ingredients/:id'
								element={<IngredientDetails style={'mt-30'} />}
							/>
							<Route path='/feed' element={<OrderFeed />} />
							<Route
								path='/feed/:number'
								element={<OrderInfo description={'block'} />}
							/>
							<Route
								path='/profile/orders/:number'
								element={
									<ProtectedRouteElement
										element={<OrderInfo description={'block'} />}
									/>
								}
							/>
						</Routes>

						{background && (
							<Routes>
								<Route
									path='/ingredients/:id'
									element={
										<Modal onClose={closeModal} details={'ingridients'}>
											<IngredientDetails />
										</Modal>
									}
								/>

								<Route
									path='/feed/:number'
									element={
										<Modal onClose={closeModal} details={'orderInfo'}>
											<OrderInfo description={'modal'} />
										</Modal>
									}
								/>

								<Route
									path='/profile/orders/:number'
									element={
										<ProtectedRouteElement
											element={
												<Modal onClose={closeModal} details={'orderInfo'}>
													<OrderInfo description={'modal'} />
												</Modal>
											}
										/>
									}
								/>
							</Routes>
						)}
					</main>
				</>
			)}
		</>
	)
}

export default App
