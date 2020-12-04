import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import GameAndPlayerCount from '../GameAndPlayerCount';

export interface AccountProps {
    className?: string;
    playerCount: number;
    gameCount: number;
}

export const Account: FC<AccountProps> = ({
    className,
    playerCount,
    gameCount,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <button className={styles.createGame}>Create a game</button>
            <button className={styles.playFriend}>Play with a friend</button>
            <button className={styles.playCpu}>Play with the computer</button>
            <GameAndPlayerCount
                className={styles.gameAndPlayerCount}
                playerCount={playerCount}
                gameCount={gameCount}
            />
        </div>
    );
};

export default Account
