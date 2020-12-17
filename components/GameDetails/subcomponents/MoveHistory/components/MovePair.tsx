import React, { useRef, FC, useEffect } from 'react';
import styles from '../styles.module.scss';
import cn from 'classnames';
import { Moment } from '../../../../../redux/board';

export interface MovePairProps {
    movePairNum: number;
    whiteMove: string;
    blackMove: string;
    history: Moment[];
    onGoTo: (movePairNum: number, white: boolean) => void;
}

export const MovePair: FC<MovePairProps> = ({
    movePairNum,
    whiteMove,
    blackMove,
    history,
    onGoTo,
}) => {
    const isWhiteMove = (movePairNum * 2) === history.length - 1;
    const isBlackMove = ((movePairNum * 2) + 1) === history.length - 1;

    const handleClickWhiteMove = () => onGoTo && onGoTo(movePairNum, true);

    const handleClickBlackMove = () => onGoTo && onGoTo(movePairNum, false);

    return (
        <li className={styles.movePair}>
            <button
                disabled={isWhiteMove}
                onClick={handleClickWhiteMove}
                className={cn(styles.move, styles.white, {
                    [styles.isCurrentMove]: isWhiteMove,
                })}
            >
                {movePairNum + 1}. {whiteMove}
            </button>
            {blackMove && (<button
                disabled={isBlackMove}
                onClick={handleClickBlackMove}
                className={cn(styles.move, styles.black, {
                    [styles.isCurrentMove]: isBlackMove,
                })}
            >
                {movePairNum + 1}. {blackMove}
            </button>)}
        </li>
    );
};

export default MovePair;
