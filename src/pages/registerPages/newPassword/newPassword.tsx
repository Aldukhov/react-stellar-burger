import styles from "./../registration.module.css";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import React, { useState, useEffect, ChangeEvent,FormEvent } from "react";
import { setParticipantFormValue, resetPas } from "../../../services/actions/resetPas";
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "../../../services/hooks";

const NewPassword: React.FC =() => {

    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
    const navigate = useNavigate();
    const onIconClick = () => {
        setPasswordType(passwordType === 'text' ? 'password' : 'text');
    }

    const { password, token } = useSelector(state => state.resetForm.form);
    const {
        resetSuccess: resetAuth
    } = useSelector(state => state.forgetForm);

    useEffect(() => {
        if (!resetAuth) {
          navigate('/forgot-password');
        }
      }, [resetAuth, navigate]);

    const {
        resetRequest, resetSuccess
    } = useSelector(state => state.resetForm);

    const dispatch = useDispatch();

    const onFormChange = (e: ChangeEvent<HTMLInputElement>):void => {
        dispatch(setParticipantFormValue(e.target.name, e.target.value))
    }

    const onFormSubmit = (e: FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        dispatch(resetPas());
    }

    useEffect(() => {
        if (resetSuccess) {
            navigate('/');
        }
    }, [resetSuccess])


    return (

        <div className={styles.register__block}>
            <h1 className={classNames(styles.register__header, 'text text_type_main-medium mb-6')}>Восстановление пароля</h1>
            <form onSubmit={onFormSubmit}>
                <ul className={styles.register__inputs}>

                    <li className={styles.register__input}>
                        <Input
                            type={passwordType}
                            placeholder={'Введите новый пароль'}
                            onChange={onFormChange}
                            name={'password'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={'ShowIcon'}
                            extraClass="mb-6"
                            onIconClick={onIconClick}
                            value={password}
                        />
                    </li>

                    <li className={styles.register__input}>
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={onFormChange}
                            name={'token'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={token}
                        />
                    </li>
                </ul>
                <Button htmlType="submit" disabled={resetRequest} type="primary" size="medium" extraClass={styles.register__batton}>
                    Сохранить
                </Button>
            </form>
            <p className={classNames(styles.register__caption, 'text text_type_main-default')}>Вспомнили пароль?
                <a className={styles.register__link}>Войти</a></p>
        </div>
    );
}

export default NewPassword;