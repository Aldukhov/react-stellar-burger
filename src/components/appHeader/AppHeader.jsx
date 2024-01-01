// appHeader.jsx
import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';

import styles from './appHeader.module.css';

function AppHeader() {
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

function Navigation() {
  const navigate = useNavigate();

  const constructor = () => {
    navigate('/', { replace: false });
  };

  const orderInfo = () => {
    navigate('/feed', { replace: false });
  };

  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5', 'mr-2')}>
          <Link to="/" className={styles.navigation__element} onClick={constructor}>
            <div className={classNames(styles.icon, 'pr-2')}><BurgerIcon /></div>
            <p className={classNames(`text text_type_main-default`)}>Конструктор</p>
          </Link>
        </li>
        <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5')}>
          <Link to="/feed" className={styles.navigation__element} onClick={orderInfo}>
            <div className={classNames(styles.icon, 'pr-2')}><ListIcon /></div>
            <p className={classNames(`text text_type_main-default`)}>Лента заказов</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();

  const profile = () => {
    navigate('/profile', { replace: false });
  };

  return (
    <div className={styles.navigation}>
      <ul>
        <li className={classNames(styles.navigation__element, 'pt-4', 'pb-4', 'pl-5', 'pr-5')}>
          <Link to="/profile" className={styles.navigation__element} onClick={profile}>
            <div className={classNames(styles.icon, 'pr-2')}><ProfileIcon /></div>
            <p className={classNames(`text text_type_main-default`)}>Личный кабинет</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AppHeader;
