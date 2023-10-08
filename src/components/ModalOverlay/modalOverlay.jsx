import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("root");

export default function ModalOverlay(props) {

    const {children, onClick}= props;

    const handleOverplayClose = (event) => {
        onClick();
    }

    const handleEscClose = (evt) => {
        if ((evt.key === 'Escape')) {
            onClick();
          }

    }

    useEffect(()=> {
        document.addEventListener('click',handleOverplayClose)
        document.addEventListener('keydown',handleEscClose)
        return() => {
            document.removeEventListener('click',handleOverplayClose)
            document.removeEventListener('keydown',handleEscClose)
        }
    })

    return ReactDOM.createPortal(
        (
            <div className={styles.overlay}>
                {children}
            </div>
        ), modalRoot

    )

}


ModalOverlay.protoTypes = {
    onClick: PropTypes.func,
    children: PropTypes.elementType
}