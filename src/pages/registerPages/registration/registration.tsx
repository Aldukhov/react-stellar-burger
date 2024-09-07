import styles from './../registration.module.css'
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	setParticipantFormValue,
	register,
} from '../../../services/actions/registerForm'
import { useSelector, useDispatch } from '../../../services/hooks'

const Registration: React.FC = () => {
	const navigate = useNavigate()
	const [passwordType, setPasswordType] = useState<'text' | 'password'>(
		'password'
	)

	const onIconClick = () => {
		setPasswordType(passwordType === 'text' ? 'password' : 'text')
	}

	const login = () => {
		navigate('/login', { replace: false })
	}

	const { email, password, name } = useSelector(
		state => state.registerForm.form
	)

	const { resetRequest } = useSelector(state => state.registerForm)
	const dispatch = useDispatch()

	const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setParticipantFormValue(e.target.name, e.target.value))
	}

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(register())
	}

	return (
		<div className={styles.register__block}>
			<h1
				className={classNames(
					styles.register__header,
					'text text_type_main-medium mb-6'
				)}
			>
				Registration
			</h1>
			<form onSubmit={onFormSubmit}>
				<ul className={styles.register__inputs}>
					<li className={styles.register__input}>
						<Input
							type={'text'}
							placeholder={'Имя'}
							onChange={onFormChange}
							name={'name'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
							value={name}
						/>
					</li>

					<li className={styles.register__input}>
						<Input
							type={'email'}
							placeholder={'E-mail'}
							onChange={onFormChange}
							name={'email'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
							value={email}
						/>
					</li>

					<li className={styles.register__input}>
						<Input
							type={passwordType}
							placeholder={'Пароль'}
							onChange={onFormChange}
							icon={'ShowIcon'}
							name={'password'}
							error={false}
							onIconClick={onIconClick}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
							value={password}
						/>
					</li>
				</ul>
				<Button
					htmlType='submit'
					disabled={resetRequest}
					type='primary'
					size='medium'
					extraClass={styles.register__batton}
				>
					Sign up
				</Button>
			</form>
			<p
				className={classNames(
					styles.register__caption,
					'text text_type_main-default'
				)}
			>
				Already registered?
				<a className={styles.register__link} onClick={login}>
					Sign in
				</a>
			</p>
		</div>
	)
}

export default Registration
