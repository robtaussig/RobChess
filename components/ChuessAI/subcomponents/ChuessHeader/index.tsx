import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { displayRulesModal, displayChangelogModal, displayBugModal } from '../../../../redux/chuess';

export interface ChuessHeaderProps {
    className?: string;
}

export const ChuessHeader: FC<ChuessHeaderProps> = ({
    className,
}) => {
    const dispatch = useDispatch();

    return (
        <div className={cn(styles.root, className)}>
            <h1 className={styles.header}>Chuess</h1>
            <button className={styles.rules} onClick={() => dispatch(displayRulesModal(true))}>Rules</button>
            <button className={styles.changeLog} onClick={() => dispatch(displayChangelogModal(true))}>Changelog</button>
            <button className={styles.bug} onClick={() => dispatch(displayBugModal(true))}>Feedback</button>
        </div>
    );
};

export default ChuessHeader
