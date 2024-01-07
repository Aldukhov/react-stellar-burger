import React, { useState, useEffect, useRef } from 'react';
import styles from './food-items.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RenderItemsOfType from '../../renderItemsOfType/RenderItemsOfType';
import { useDispatch } from 'react-redux';
import { ADD_ITEM, DELETE_ITEM } from '../../../../services/actions/modalItem';
import { ITabProps, IIntersectionOptions } from '../../types/burgerInterfaces';

const FoodItems: React.FC<ITabProps> = ({ scrollSauce, scrollBun, scrollMain, tabRef, setCurrent }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    /*  const openModal = (element, toggleRef) => {
  
          toggleRef = false;
  
          dispatch({
              type: ADD_ITEM,
              item: element
          });
  
      };
  */

    const options: IIntersectionOptions = {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0,
    };


    const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
        let closestElement: HTMLElement | null = null;
        let minDistance = Number.MAX_SAFE_INTEGER;

        entries.forEach((entry) => {
            const element = entry.target;

            if (element instanceof HTMLElement) {
                const bounds = element.getBoundingClientRect();
                const topDistance = Math.abs(bounds.top);

                if (topDistance < minDistance) {
                    minDistance = topDistance;
                    closestElement = element;
                }
            }
        });

        if (closestElement) {
            setCurrent((closestElement as HTMLElement).id);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        if (containerRef.current) {
            // Отслеживаем каждый заголовок
            const tabs: NodeListOf<Element> = containerRef.current.querySelectorAll('.caption');
            console.log(tabs);
            tabs.forEach((tab) => {
                observer.observe(tab);
            });
        }

        // Очистка ресурсов при размонтировании
        return () => {
            observer.disconnect();
        };
    }, []);



    return (
        <section className={classNames('custom-scroll', styles['food-items'])} ref={containerRef}>
            <div ref={scrollBun} >
                <h2 className={classNames("text text_type_main-large caption")} id='Булки'>Булки</h2>


                <RenderItemsOfType
                    burger={'ingrediens'}
                    type='bun'
                    styles={styles}
                //openModal={openModal}
                />


            </div>

            <div ref={scrollSauce} className={"mt-10"} >
                <h2 className={classNames("text text_type_main-large caption")} id='Соусы' >Соусы</h2>


                <RenderItemsOfType
                    burger={'ingrediens'}
                    type="sauce"
                    styles={styles}
                // openModal={openModal}
                />

            </div>

            <div ref={scrollMain} className={"mt-10"}>
                <h2 className={classNames("text text_type_main-large caption")} id="Начинки">Начинки</h2>


                <RenderItemsOfType
                    burger={'ingrediens'}
                    type='main'
                    styles={styles}
                // openModal={openModal}
                />

            </div>
        </section>
    )
}

export default FoodItems;