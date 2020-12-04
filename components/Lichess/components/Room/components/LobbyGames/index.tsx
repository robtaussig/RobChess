import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { LobbyGame as LobbyGameType } from '../../../../../../redux/lichess';
import LobbyGame from '../LobbyGame';

export interface LobbyGamesProps {
    className?: string;
    lobby: LobbyGameType[];
}

export const LobbyGames: FC<LobbyGamesProps> = ({
    className,
    lobby,
}) => {
    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.graph}>
                <button className={cn(styles.graphButton, 'gg-trending')}/>
            </span>
            <span className={styles.playerHeader}>Player</span>
            <span className={styles.ratingHeader}>Rating</span>
            <span className={styles.timeHeader}>Time</span>
            <span className={styles.modeHeader}>Mode</span>
            {lobby.map(lobbyGame => {
                return (
                    <LobbyGame
                        key={`${lobbyGame.playerId}-${lobbyGame.mode}-lobby-game`}
                        className={styles.lobbyGame}
                        lobbyGame={lobbyGame}
                    />
                );
            })}
        </div>
    );
};

export default LobbyGames
