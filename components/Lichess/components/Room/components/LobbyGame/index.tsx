import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { LobbyGame as LobbyGameType } from '../../../../../../redux/lichess';

export interface LobbyGameProps {
    className?: string;
    lobbyGame: LobbyGameType;
}

export const LobbyGame: FC<LobbyGameProps> = ({
    className,
    lobbyGame,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.challengerColor}>
                {lobbyGame.challengerColor === 'white' ? (
                    <i className={cn(styles.challengerIcon, styles.white)}/>
                ) : lobbyGame.challengerColor === 'black' ? (
                    <i className={cn(styles.challengerIcon, styles.black)}/>
                ) : (
                    <i className={cn(styles.challengerIcon, styles.random)}/>
                )}
            </span>
            <span className={styles.playerId}>{lobbyGame.playerId}</span>
            <span className={styles.rating}>{lobbyGame.rating}</span>
            <span className={styles.time}>{lobbyGame.time}</span>
            <span className={styles.mode}>{lobbyGame.mode}</span>
        </div>
    );
};

export default LobbyGame
