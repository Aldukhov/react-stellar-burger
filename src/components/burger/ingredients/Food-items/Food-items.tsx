import React, { useEffect, useRef } from 'react'
import styles from './food-items.module.css'
import classNames from 'classnames'
import RenderItemsOfType from '../../renderItemsOfType/RenderItemsOfType'
import { ITabProps, IIntersectionOptions } from '../../types/burgerInterfaces'

const FoodItems: React.FC<ITabProps> = ({
	scrollSauce,
	scrollBun,
	scrollMain,
	tabRef,
	setCurrent,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)

	const options: IIntersectionOptions = {
		root: null,
		rootMargin: '0px 0px 0px 0px',
		threshold: 0,
	}

	const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
		let closestElement: HTMLElement | null = null
		let minDistance = Number.MAX_SAFE_INTEGER

		entries.forEach(entry => {
			const element = entry.target

			if (element instanceof HTMLElement) {
				const bounds = element.getBoundingClientRect()
				const topDistance = Math.abs(bounds.top)

				if (topDistance < minDistance) {
					minDistance = topDistance
					closestElement = element
				}
			}
		})

		if (closestElement) {
			setCurrent((closestElement as HTMLElement).id)
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersect, options)
		if (containerRef.current) {
			// Отслеживаем каждый заголовок
			const tabs: NodeListOf<Element> =
				containerRef.current.querySelectorAll('.caption')
			console.log(tabs)
			tabs.forEach(tab => {
				observer.observe(tab)
			})
		}

		// Очистка ресурсов при размонтировании
		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<section
			className={classNames('custom-scroll', styles['food-items'])}
			ref={containerRef}
		>
			<div ref={scrollBun}>
				<h2
					className={classNames('text text_type_main-large caption')}
					id='Булки'
				>
					Buns
				</h2>

				<RenderItemsOfType burger={'ingrediens'} type='bun' styles={styles} />
			</div>

			<div ref={scrollSauce} className={'mt-10'}>
				<h2
					className={classNames('text text_type_main-large caption')}
					id='Соусы'
				>
					Sauces
				</h2>

				<RenderItemsOfType burger={'ingrediens'} type='sauce' styles={styles} />
			</div>

			<div ref={scrollMain} className={'mt-10'}>
				<h2
					className={classNames('text text_type_main-large caption')}
					id='Начинки'
				>
					Toppings
				</h2>

				<RenderItemsOfType burger={'ingrediens'} type='main' styles={styles} />
			</div>
		</section>
	)
}

export default FoodItems
