import styles from "./account.module.css";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from "react";
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VARIABLE_VALUES } from "../../services/actions/profile";
import { setParticipantFormValue, profileUpdate, profileLogout, profile } from "../../services/actions/profile";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, []);

  const {
    email,
    name,
    password,
  } = useSelector(state => state.profile.modifyForm);

  const {
    modifyUser
  } = useSelector(state => state.profile);

  const onIconClick = () => {

  }

  const onCancelClick = () => {
    dispatch({
      type: VARIABLE_VALUES
    });
  }

  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value))
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(profileUpdate())
  }

  const logout = () => {
    dispatch(profileLogout());
    navigate('/login', { replace: true })
  }
  return (
    <section>
      <form onSubmit={onFormSubmit} className={styles.account}> {/*Открытие формы*/}
        <div className={'mr-15'}>
          <ul className={styles['account__block-details']}>
            <li className={classNames(styles.account__details)}>
              <button type='button' className={classNames(styles.account__details_button, 'text text_type_main-medium')}>Профиль</button>
            </li>
            <li className={classNames(styles.account__details)}>
              <button type='button' className={classNames(styles.account__details_button, 'text text_type_main-medium')}>История заказов</button>
            </li>
            <li className={classNames(styles.account__details)}>
              <button type='button' onClick={logout} className={classNames(styles.account__details_button, 'text text_type_main-medium')}>Выход</button>
            </li>
          </ul>

          <span className={classNames(styles.caption, 'text text_type_main-default text_color_inactive mt-20')}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>

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
                extraClass="ml-1 mb-6"
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
                extraClass="ml-1 mb-6"
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
                extraClass="ml-1 mb-6"
              />

            </li>

          </ul>

          {modifyUser ?
            (<ul className={classNames(styles['account__block-details'], styles.edit, 'mt-6')}>
              <li className={classNames(styles.account__details)}>
                <button type="submit" className={classNames(styles.account__details_button, 'text text_type_main-medium', styles.account__details_button_edit)}>Сохранить</button>
              </li>
              <li className={classNames(styles.account__details)}>
                <button type='button' className={classNames(styles.account__details_button, 'text text_type_main-medium', styles.account__details_button_edit)} onClick={onCancelClick}>Отмена</button>
              </li>
            </ul>) : null
          }
        </div>
      </form>  {/*Закрытие формы*/}
    </section>
  );
}

export default Account;