import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Rule } from '../../constants';
import Modal from '../../../Modal';

export interface RulesProps {
    className?: string;
    rules: Rule[];
    open: boolean;
    onClose: () => void;
}

export const Rules: FC<RulesProps> = ({
    className,
    open,
    onClose,
    rules,
}) => {

    return <Modal
        open={open}
        onClose={onClose}
        title="Rules"
    >
        <div className={styles.root}>
            {rules.map(({ title, description }) => {
                return (
                    <div key={`${title}-rule`} className={styles.rule}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.description}>{description}</p>
                    </div>
                );
            })}
        </div>
    </Modal>
};

export default Rules
