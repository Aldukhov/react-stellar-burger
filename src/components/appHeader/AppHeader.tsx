// appHeader.jsx
import React, {ReactEventHandler} from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useNavigate, Link} from 'react-router-dom';

import styles from './appHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={classNames(styles.header)}>
      <nav className={classNames(`pt-4 pb-4`, styles.header__content)}>
        <div className={styles.header__navAndLogo}>
        <Navigation />
        <Logo />
        </div>
        <Profile />
      </nav>
    </header>
  );
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const constructor: ReactEventHandler = (event) => {
    event.preventDefault();
    navigate('/', { replace: false });
  };

  const orderInfo : ReactEventHandler = (event) =>{
    event.preventDefault();
    navigate('/feed', { replace: false });
  };

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5', 'mr-2')}>
          <Link to="/" className={styles.navigation__element} onClick={constructor}>
            <div className={classNames(styles.icon, 'pr-2')}><BurgerIcon type={'primary'}/></div>
            <p className={classNames(`text text_type_main-default`)}>Конструктор</p>
          </Link>
        </li>
        <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5')}>
          <Link to="/feed" className={styles.navigation__element} onClick={orderInfo}>
            <div className={classNames(styles.icon, 'pr-2')}><ListIcon type={'primary'}/></div>
            <p className={classNames(`text text_type_main-default`)}>Лента заказов</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const profile: ReactEventHandler = (event) =>{
    event.preventDefault();
    navigate('/profile', { replace: false });
  };

  return (
    <div className={styles.navigation}>
      <ul>
        <li className={classNames(styles.navigation__element, 'pt-4', 'pb-4', 'pl-5', 'pr-5')}>
          <Link to="/profile" className={styles.navigation__element} onClick={profile}>
            <div className={classNames(styles.icon, 'pr-2')}><ProfileIcon  type={'primary'}/></div>
            <p className={classNames(`text text_type_main-default`)}>Личный кабинет</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AppHeader;
