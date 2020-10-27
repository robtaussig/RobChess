import React, { useRef, FC, useEffect } from 'react';
import styles from '../styles.module.scss';
import cn from 'classnames';
import { Moment } from '../../../../../redux/board';

export interface MovePairProps {
    movePairNum: number;
    whiteMove: string;
    blackMove: string;
    history: Moment[];
}

export const MovePair: FC<MovePairProps> = ({
    movePairNum,
    whiteMove,
    blackMove,
    history,
}) => {
    const liRef = useRef<HTMLLIElement>(null);
    const isWhiteMove = (movePairNum * 2) === history.length - 1;
    const isBlackMove = ((movePairNum * 2) + 1) === history.length - 1;

    useEffect(() => {
        if (isWhiteMove || isBlackMove) {
            liRef.current.scrollIntoView();
        }
    }, [isWhiteMove, isBlackMove]);

    return (
        <li ref={liRef} className={styles.movePair}>
            <span
                className={cn(styles.move, styles.white, {
                    [styles.isCurrentMove]: isWhiteMove,
                })}
            >
                {movePairNum + 1}. {whiteMove}
            </span>
            {blackMove && (<span
                className={cn(styles.move, styles.black, {
                    [styles.isCurrentMove]: isBlackMove,
                })}
            >
                {movePairNum + 1}. {blackMove}
            </span>)}
        </li>
    );
};

export default MovePair;
