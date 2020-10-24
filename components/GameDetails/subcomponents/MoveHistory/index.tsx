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
            {moveHistory.map((move, idx) => {
                return (
                    <span
                        key={`${idx}-move`}
                        className={cn(styles.move, {
                            [styles.white]: idx % 2 === 0,
                            [styles.black]: idx % 2 === 1,
                            [styles.isCurrentMove]: idx === history.length - 1,
                        })}
                    >
                        {Math.floor(idx / 2) + 1}. {move}
                    </span>
                );
            })}
        </div>
    );
};

export default MoveHistory;
