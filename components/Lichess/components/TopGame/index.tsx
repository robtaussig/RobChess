import React, { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { TopGame, makeBestMove } from '../../../../redux/lichess';
import Board from '../Board';
import { secondsToClock } from './util';

export interface AccountProps {
    className?: string;
    topGame: TopGame;
}

export const Account: FC<AccountProps> = ({
    className,
    topGame,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (topGame?.board) {
            const timeout = setTimeout(() => {
                dispatch(makeBestMove());
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [topGame?.board]);

    if (!topGame) return null;

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.blackPlayer}>{topGame.blackPlayerId}</span>
            <span className={styles.blackPlayerRating}>2500</span>
            <span className={styles.blackTime}>{secondsToClock(topGame.blackTime)}</span>
            <Board
                className={styles.board}
                board={topGame.board}
                lastMove={topGame.lastMove}
            />
            <span className={styles.whitePlayer}>{topGame.whitePlayerId}</span>
            <span className={styles.whitePlayerRating}>2500</span>
            <span className={styles.whiteTime}>{secondsToClock(topGame.whiteTime)}</span>
        </div>
    );
};

export default Account
