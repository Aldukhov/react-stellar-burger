import React, { MouseEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modalOverlay.module.css'
import PropTypes from 'prop-types';

interface IMOdalOverlayProps {
  onClick:() => void;
}

const ModalOverlay: React.FC <IMOdalOverlayProps> = ({onClick}) => {

    const handleOverplayClose = (event: React.MouseEvent<HTMLDivElement> ):void => {
        if (event.target instanceof HTMLDivElement && event.target.classList.contains(`${styles.overlay}`)) {
            onClick();
          }
    }

    return(
            <div onClick={handleOverplayClose} className={styles.overlay}>
                
            </div>
        );
    


}
export default ModalOverlay;