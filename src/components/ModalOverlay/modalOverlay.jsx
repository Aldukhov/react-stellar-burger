import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';


export default function ModalOverlay(props) {

    const { onClick } = props;

    const handleOverplayClose = (event) => {
        if (event.target.classList.contains(`${styles.overlay}`)) {
            onClick();
        }
    }

    return(
            <div onClick={handleOverplayClose} className={styles.overlay}>
                
            </div>
        );
    

}


ModalOverlay.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.elementType
}