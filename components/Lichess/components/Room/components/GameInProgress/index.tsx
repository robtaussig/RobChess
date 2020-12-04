import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Game } from '../../../../../../redux/lichess';
import Board from '../../../Board';

export interface GameInProgressProps {
    className?: string;
    gameInPlay: Game;
}

export const GameInProgress: FC<GameInProgressProps> = ({
    className,
    gameInPlay,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <Board
                className={styles.board}
                board={gameInPlay.board}
                lastMove={null}
            />
            <span className={styles.opponent}>{gameInPlay.opponentId}</span>
        </div>
    );
};

export default GameInProgress
