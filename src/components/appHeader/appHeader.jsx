import React from 'react';
import styles from './appHeader.module.css';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import globalStyles from '../../global-styles.module.css'

function AppHeader() {

    return (
        <header className={classNames(styles.header)}>
            <nav className={classNames(`pt-4 pb-4`, styles.header__content)}>
                <Navigation />
                <Logo />
                <Profile />
            </nav>
        </header>
    )

}

function Navigation() {

    return (

        <div className={styles.navigation}>
            <ul className={styles.navigation__list}>
                <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5', 'mr-2')}>
                    <a href='#' className={styles.navigation__element}>
                        <div className={classNames(styles.icon, 'pr-2')}><BurgerIcon /></div>
                        <p className={classNames(`text text_type_main-default`)}>Конструктор</p>
                    </a>
                </li>
                <li className={classNames('pt-4', 'pb-4', 'pl-5', 'pr-5')}>
                    <a href='#' className={styles.navigation__element}>
                        <div className={classNames(styles.icon, 'pr-2')}><ListIcon /></div>
                        <p className={classNames(`text text_type_main-default`)}>Лента заказов</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}


function Profile() {

    return (
        <div className={styles.navigation}>
            <ul>
                <li className={classNames(styles.navigation__element, 'pt-4', 'pb-4', 'pl-5', 'pr-5')}>
                    <a href='#' className={styles.navigation__element}>
                        <div className={classNames(styles.icon, 'pr-2')}><ProfileIcon /></div>
                        <p className={classNames(`text text_type_main-default`)}>Личный кабинет</p>
                    </a>
                </li>
            </ul>
        </div>
    )

}


export default AppHeader;