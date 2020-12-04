import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { HistoryItem as HistoryItemType, Results } from '../../../../redux/lichess';
import { formatDistance } from 'date-fns';

export interface HistoryItemProps {
    className?: string;
    historyItem: HistoryItemType;
}

const ResultMap = {
    [Results.Draw]: 'Draw',
    [Results.Win]: 'Victory',
    [Results.Loss]: 'Defeat',
}

export const HistoryItem: FC<HistoryItemProps> = ({
    className,
    historyItem,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.result}>{ResultMap[historyItem.result]}</span>
            vs
            <span className={styles.opponent}>{historyItem.opponentId}</span>
            in
            <br/>
            <span className={styles.mode}>{historyItem.mode}</span>
            <span>•</span>
            <span className={styles.time}>{formatDistance(new Date(historyItem.time), new Date())}</span>
        </div>
    );
};

export default HistoryItem
