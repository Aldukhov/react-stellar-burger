import styles from './categories.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import Tabmenu from '../Tab-menu/Tab-menu';
import PropTypes from 'prop-types';
import React from 'react';
import { ITabProps } from '../../types/burgerInterfaces';

const Categories: React.FC<ITabProps> = ({scrollSauce,scrollBun,scrollMain,tabRef,current,setCurrent}) => {

  return (
    <section>
      <h2 className={classNames("text text_type_main-large pt-10")}>Соберите бургер</h2>
      <div className={classNames(styles.categories, 'pt-5 pb-10')}>
        <Tabmenu scrollBun={scrollBun} scrollSauce={scrollSauce} scrollMain={scrollMain} tabRef = {tabRef} current={current} setCurrent = {setCurrent}/>
      </div>
    </section>
  );
}

export default Categories
