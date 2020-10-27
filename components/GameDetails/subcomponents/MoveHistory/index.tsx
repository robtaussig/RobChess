import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { boardSelector } from '../../../../redux/board';
import { convertMoveHistory } from './util';
import { useSelector } from 'react-redux';
import TimeTravelButtons from '../TimeTravelButtons';
import MovePair from './components/MovePair';
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
            <TimeTravelButtons className={styles.timeTravelButtons} />
            <ul className={styles.moveList} >
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
                            <MovePair
                                key={`${idx}-move-history`}
                                movePairNum={idx}
                                whiteMove={whiteMove}
                                blackMove={blackMove}
                                history={history}
                            />
                        );
                })}
            </ul>
        </div>
    );
};

export default MoveHistory;
