import React, { useState } from 'react';
import styles from './tab-menu.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';


export default function Tabmenu(props) {
  
  const scrollToElement = (element) => {
    element.current.scrollIntoView({ behavior: 'smooth' });
  }

  
  return (
    <div className={styles['tab-menu']} ref={props.tabRef}>
      <Tab value="Булки" active={props.current === 'Булки'} onClick={() => { props.setCurrent('Булки'); scrollToElement(props.scrollBun) }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={props.current === 'Соусы'} onClick={() => { props.setCurrent('Соусы'); scrollToElement(props.scrollSauce) }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={props.current === 'Начинки'} onClick={() => { props.setCurrent('Начинки'); scrollToElement(props.scrollMain) }}>
        Начинки
      </Tab>
    </div>
  );
}


Tabmenu.propTypes = {
  scrollBun: PropTypes.any,
  scrollSauce: PropTypes.any,
  scrollMain: PropTypes.any
}

