import React, { useState } from 'react';
import styles from './ingredients.module.css';
import { CurrencyIcon, Counter,Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { current } from '@reduxjs/toolkit';

class Ingredients extends React.Component {
    render() {
        return (
            <section className={classNames(styles.ingredients, 'mr-10')}>
                <Categories />
                <FoodItems dat={this.props.data} />
            </section>
        )
    }
}


function Categories() {
    const [current, setCurrent] = useState('Булки');
  
    function tabmenu() {
      return (
        <div style={{ display: 'flex' }}>
          <Tab value="Булки" active={current === 'Булки'} onClick={() => setCurrent('Булки')}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={() => setCurrent('Соусы')}>
            Соусы
          </Tab>    
          <Tab value="Начинки" active={current === 'Начинки'} onClick={() => setCurrent('Начинки')}>
            Начинки
          </Tab>  
        </div>
      );
    }
  
    return (
      <section>
        <h2 className={classNames("text text_type_main-large pt-10")}>Соберите бургер</h2>
        <div className={classNames(styles.categories, 'pt-5 pb-10')}>
          {tabmenu()}
        </div>
      </section>
    );
  }


class FoodItems extends React.Component {


    renderItemsOfType(type) {
        const filterType = this.props.dat.filter((element) => element.type === type);

        let items = filterType.map((element) => {
            return (
                <div className={classNames(styles.item)} key={element.id}>
                    <img className={classNames(styles.item__image, 'styles.item__image_crator-bun', 'ml-3 mr-3')} src={element.image} alt={element.name} />
                    <div className={classNames(styles.item__price, 'mt-1 mb-1')}><p className={classNames('text text_type_digits-default', 'pr-2', styles.item__priceInfo)}>{element.price}</p><CurrencyIcon type="primary" /></div>
                    <p className={classNames("text text_type_main-default", styles.item__itemInfo)}>{element.name}</p>
                    <Counter count={1} size="default" extraClass="m-1" />
                </div>
            )
        })

        return items;
    }

    render() {
        return (
            <section className={classNames('custom-scroll', styles['food-items'])}>
                <div className={classNames("styles.buns-block styles.ingridients-blocks")}>
                    <h2 className={classNames("text text_type_main-large")}>Булки</h2>
                    <section className={classNames(styles.items)}>
                        {this.renderItemsOfType('bun')}
                    </section>
                </div>

                <div className={classNames("styles.sauses-block styles.ingridients-blocks mt-10")}>
                    <h2 className={classNames("text text_type_main-large")}>Соусы</h2>
                    <section className={classNames(styles.items)}>
                        {this.renderItemsOfType("sauce")}
                    </section>
                </div>

                <div className={classNames("styles.mains-block styles.ingridients-blocks mt-10")}>
                    <h2 className={classNames("text text_type_main-large")}>Начинки</h2>
                    <section className={classNames(styles.items)}>
                        {this.renderItemsOfType('main')}
                    </section>
                </div>
            </section>
        )
    }
}

export default Ingredients;