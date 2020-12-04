import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Game } from '../../../../../../redux/lichess';
import GameInProgress from '../GameInProgress';

export interface GamesInProgressProps {
    className?: string;
    gamesInPlay: Game[];
}

export const GamesInProgress: FC<GamesInProgressProps> = ({
    className,
    gamesInPlay,
}) => {
    console.log(gamesInPlay);

    return (
        <div className={cn(styles.root, className)}>
            {gamesInPlay.map(gameInPlay => {
                return (
                    <GameInProgress
                        className={styles.gameInPlay}
                        gameInPlay={gameInPlay}
                    />
                );
            })}
        </div>
    );
};

export default GamesInProgress
