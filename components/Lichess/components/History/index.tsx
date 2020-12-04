import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { HistoryItem as HistoryItemType } from '../../../../redux/lichess';
import HistoryItem from '../HistoryItem';

export interface HistoryProps {
    className?: string;
    history: HistoryItemType[];
}

export const History: FC<HistoryProps> = ({
    className,
    history,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            {history.map(historyItem => {
                return (
                    <HistoryItem
                        key={`${historyItem.result}-${historyItem.opponentId}-${historyItem.time}`}
                        className={styles.historyItem}
                        historyItem={historyItem}
                    />
                );
            })}
        </div>
    );
};

export default History
