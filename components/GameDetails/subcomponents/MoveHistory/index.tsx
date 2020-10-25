import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { boardSelector, Moment } from '../../../../redux/board';
import { convertMoveHistory } from './util';
import { useSelector } from 'react-redux';

export interface MoveHistoryProps {
    className?: string;
}

export const MoveHistory: FC<MoveHistoryProps> = ({
    className,
}) => {
    const {
        history,
        future,
        lastMove,
    } = useSelector(boardSelector);
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        if (history) {
            setMoveHistory(convertMoveHistory(history, future, lastMove));
        }
    }, [history, future, lastMove]);

    return (
        <div className={cn(styles.root, className)}>
            {moveHistory
            .reduce((pairs, move, idx) => {
                if (idx % 2 === 0) {
                    pairs.push([]);
                }
                pairs[pairs.length - 1].push(move);
                return pairs;
            }, [])
            .map(([whiteMove, blackMove], idx) => {
                return (
                    <div className={styles.movePair}>
                        <span
                            key={`${idx}-move`}
                            className={cn(styles.move, styles.white, {
                                [styles.isCurrentMove]: (idx * 2) === history.length - 1,
                            })}
                        >
                            {idx + 1}. {whiteMove}
                        </span>
                        {blackMove && (<span
                            key={`${idx}-move`}
                            className={cn(styles.move, styles.black, {
                                [styles.isCurrentMove]: ((idx * 2) + 1) === history.length - 1,
                            })}
                        >
                            {idx + 1}. {blackMove}
                        </span>)}
                    </div>
                );
            })}
        </div>
    );
};

export default MoveHistory;
