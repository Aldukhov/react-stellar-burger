import styles from "./../registration.module.css";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useState, useCallback,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setParticipantFormValue, login } from "../../../services/actions/login";


function SignIn() {

    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState('password');

    const onIconClick = () => {
        setPasswordType(passwordType === 'text' ? 'password' : 'text');
    }

    const register = useCallback(() => {
        navigate('/register', { replace: false })
    });

    const changePassword = useCallback(() => {
        navigate('/forgot-password', { replace: false })
    });


    const {
        email,
        password,
    } = useSelector(state => state.loginForm.form);

    const {
        resetRequest,resetSuccess
    } = useSelector(state => state.loginForm);

    const dispatch = useDispatch();

    const onFormChange = (e) => {
        dispatch(setParticipantFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login())
    }
    useEffect(()=>{
        if(resetSuccess) {
            navigate('/');
        }
    },[resetSuccess])

    return (

        <div className={styles.register__block}>
            <h1 className={classNames(styles.register__header, 'text text_type_main-medium mb-6')}>Вход</h1>
            <form onSubmit={onFormSubmit}>
                <ul className={styles.register__inputs}>

                    <li className={styles.register__input}>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={onFormChange}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value = {email}
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
                            extraClass="mb-6"
                            value = {password}
                        />
                    </li>
                </ul>
                <Button htmlType="submit" disabled={resetRequest} type="primary" size="medium" extraClass={styles.register__batton}>
                    Войти
                </Button>
            </form>
            <p className={classNames(styles.register__caption, 'text text_type_main-default mb-4')}>Вы — новый пользователь?<a className={styles.register__link} onClick={register}>Зарегистрироваться</a></p>
            <p className={classNames(styles.register__caption, 'text text_type_main-default')}>Забыли пароль?<a className={styles.register__link} onClick={changePassword}>Восстановить пароль</a></p>
        </div>
    );
}

export default SignIn;