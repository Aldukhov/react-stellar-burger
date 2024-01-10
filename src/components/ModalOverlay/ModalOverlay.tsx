import React, { MouseEvent} from 'react';
import styles from './modalOverlay.module.css'

interface IMOdalOverlayProps {
  onClick:() => void;
}

const ModalOverlay: React.FC <IMOdalOverlayProps> = ({onClick}) => {

    const handleOverplayClose = (event: MouseEvent<HTMLDivElement> ):void => {
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