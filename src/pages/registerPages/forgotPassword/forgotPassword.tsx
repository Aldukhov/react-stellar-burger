import styles from './../registration.module.css'
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import {
	setParticipantFormValue,
	forgotPas,
} from '../../../services/actions/forgotPas'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from '../../../services/hooks'

const ForgotPassword: React.FC = () => {
	const navigate = useNavigate()
	const { email } = useSelector(state => state.forgetForm.form)

	const { resetRequest, resetSuccess } = useSelector(state => state.forgetForm)

	const dispatch = useDispatch()

	const onFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
		dispatch(setParticipantFormValue(e.target.name, e.target.value))
	}

	const onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		dispatch(forgotPas())
	}

	useEffect(() => {
		if (resetSuccess) {
			navigate('/reset-password')
		}
	}, [resetSuccess])

	return (
		<div className={styles.register__block}>
			<h1
				className={classNames(
					styles.register__header,
					'text text_type_main-medium mb-6'
				)}
			>
				Password Restore
			</h1>
			<form onSubmit={onFormSubmit}>
				<ul className={styles.register__inputs}>
					<li className={styles.register__input}>
						<Input
							type={'email'}
							placeholder={'Укажите E-mail'}
							name={'email'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							extraClass='mb-6'
							onChange={onFormChange}
							value={email}
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
					Restore
				</Button>
			</form>
			<p
				className={classNames(
					styles.register__caption,
					'text text_type_main-default'
				)}
			>
				Remember your password?
				<a className={styles.register__link}>Sign in</a>
			</p>
		</div>
	)
}

export default ForgotPassword
