import React from 'react'
import {} from '@ya.praktikum/react-developer-burger-ui-components'
import Info from './Info/Info'
import FoodItems from './Food-Items/Food-items'

const BurgerConstructor: React.FC = () => {
	return (
		<section>
			<FoodItems />
			<Info />
		</section>
	)
}

export default BurgerConstructor
