import React, { useEffect } from 'react';
import styles from './modal.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function Modal(props) {

    const {children,details} = props;
    return (
        <div className={classNames(styles['modal-block'], styles[`modal-block_${details}`], 'pt-10 pl-10 pr-10')}>
            {children}
        </div>
    )

}


Modal.protoTypes = {

    details: PropTypes.string,
    children: PropTypes.elementType
}

