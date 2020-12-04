import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

export interface GameAndPlayerCountProps {
    className?: string;
    playerCount: number;
    gameCount: number;
}

export const GameAndPlayerCount: FC<GameAndPlayerCountProps> = ({
    className,
    playerCount,
    gameCount,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <p className={styles.text}>
                <span className={styles.bold}>
                    {playerCount}
                </span> players
            </p>
            <p className={styles.text}>
                <span className={styles.bold}>
                    {gameCount}
                </span> games in play
            </p>
        </div>
    );
};

export default GameAndPlayerCount
