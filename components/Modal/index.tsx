import React, { FC } from 'react';
import ReactModal from 'react-modal';
import styles from './styles.module.scss';

export interface ModalProps {
    children: JSX.Element;
    open: boolean;
    onClose: () => void;
    title: string;
}

export const Modal: FC<ModalProps> = ({
    children,
    open,
    onClose,
    title,
}) => {

    return (
        <ReactModal
            isOpen={open}
            onRequestClose={onClose}
            style={{
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                },
                overlay: {
                    zIndex: 1000,
                }
            }}
            contentLabel={title}
            shouldCloseOnOverlayClick={true}
            appElement={typeof document !== 'undefined' && document?.querySelector('body')}
        >
            <h1 className={styles.header}>{title}</h1>
            <div className={styles.body}>{children}</div>
            <button className={styles.closeButton} onClick={onClose}>Close</button>
        </ReactModal>
    );
};

export default Modal
