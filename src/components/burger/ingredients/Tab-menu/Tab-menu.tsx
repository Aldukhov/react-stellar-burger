import React, { useState } from 'react';
import styles from './tab-menu.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ITabProps } from '../../types/TabProps';

const Tabmenu:React.FC<ITabProps> =({scrollSauce,scrollBun,scrollMain,tabRef,current,setCurrent}) => {
  
  const scrollToElement = (element: React.RefObject<HTMLDivElement> ) => {
    if (element.current) {
      element.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  
  return (
    <div className={styles['tab-menu']} ref={tabRef}>
      <Tab value="Булки" active={current === 'Булки'} onClick={() => {setCurrent('Булки'); scrollToElement(scrollBun) }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={() => {setCurrent('Соусы'); scrollToElement(scrollSauce) }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={() => {setCurrent('Начинки'); scrollToElement(scrollMain) }}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabmenu;

