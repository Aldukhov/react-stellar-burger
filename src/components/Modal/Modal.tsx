import React, { useEffect } from 'react';
import styles from './modal.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay
    from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot: HTMLElement | null = document.getElementById("root");

interface IModalProps {
    children: JSX.Element;
    details: string;
    onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, details, onClose }) => {


    const handleEscClose = (event: KeyboardEvent ) => {
        if ((event.key === 'Escape')) {
            onClose();
        }

    }

    useEffect(() => {
        document.addEventListener('keydown',  handleEscClose)
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })

    if(!modalRoot)
    {
        return null
    }

    return ReactDOM.createPortal((
       <div>
            <div className={classNames(styles['modal-block'], styles[`modal-block_${details}`], 'pt-10 pl-10 pr-10')}>
           <div className ={styles['modal-closeIcon']}><CloseIcon type="primary" onClick={onClose}/></div> 
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
       </div>
    ), modalRoot)

}

export default Modal;
