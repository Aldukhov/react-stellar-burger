import React, { useEffect } from 'react';
import styles from './modal.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay
    from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById("root");

export default function Modal(props) {

    const { children, details, onClose } = props;


    const handleEscClose = (evt) => {
        if ((evt.key === 'Escape')) {
            onClose();
        }

    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose)
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })


    return ReactDOM.createPortal((
       <div>
            <div className={classNames(styles['modal-block'], styles[`modal-block_${details}`], 'pt-10 pl-10 pr-10')}>
           <div className ={styles['modal-closeIcon']}><CloseIcon type="primary" onClick={onClose}/></div> 
           {console.log('111', children)}
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
       </div>
    ), modalRoot)

}


Modal.propTypes = {
    onClose: PropTypes.func,
    details: PropTypes.string,
    children: PropTypes.node
}

