import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { goTo, Moment } from '../../../../redux/board';
import { convertMoveHistory } from './util';
import { useDispatch } from 'react-redux';
import TimeTravelButtons from '../TimeTravelButtons';
import MovePair from './components/MovePair';
export interface MoveHistoryProps {
    className?: string;
    history: Moment[];
    future: Moment[];
    lastMove: [number, number];
}

export const MoveHistory: FC<MoveHistoryProps> = ({
    className,
    history,
    future,
    lastMove,
}) => {
    const dispatch = useDispatch();
    const [moveHistory, setMoveHistory] = useState([]);

    const handleGoToMove = (moveNum: number, white: boolean) => {
        dispatch(goTo(moveNum * 2 + (white ? 0 : 1)));
    };

    useEffect(() => {
        if (history) {
            setMoveHistory(convertMoveHistory(history, future, lastMove));
        }
    }, [history, future, lastMove]);

    return (
        <div className={cn(styles.root, className)}>
            <TimeTravelButtons
                className={styles.timeTravelButtons}
                history={history}
                future={future}
            />
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
                                onGoTo={handleGoToMove}
                            />
                        );
                })}
            </ul>
        </div>
    );
};

export default MoveHistory;
