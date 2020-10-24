import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Moment } from '../../../../redux/board';
import { convertMoveHistory } from './util';

export interface MoveHistoryProps {
    className?: string;
    history: Moment[];
    lastMove: [number, number];
}

export const MoveHistory: FC<MoveHistoryProps> = ({
    className,
    history,
    lastMove,
}) => {
    const [moveHistory, setMoveHistory] = useState([]);

    useEffect(() => {
        if (history) {
            setMoveHistory(convertMoveHistory(history, lastMove));
        }
    }, [history, lastMove]);

    return (
        <div className={cn(styles.root, className)}>
            {moveHistory.map((move, idx) => {
                return (
                    <span
                        key={`${idx}-move`}
                        className={cn(styles.move, {
                            [styles.white]: idx % 2 === 0,
                            [styles.black]: idx % 2 === 1,
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
