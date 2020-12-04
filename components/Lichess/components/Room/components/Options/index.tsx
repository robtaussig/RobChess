import React, { FC, useRef } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { RoomOptions } from '../../types';
import QuickPairing from '../QuickPairing';
import LobbyGames from '../LobbyGames';
import GamesInProgress from '../GamesInProgress';
import { Game, GameModes, LobbyGame } from '../../../../../../redux/lichess';

export interface OptionsProps {
    className?: string;
    currentRoom: RoomOptions;
    lobby: LobbyGame[];
    gamesInPlay: Game[];
}

export const Options: FC<OptionsProps> = ({
    className,
    currentRoom,
    lobby,
    gamesInPlay,
}) => {
    const rootRef = useRef(null);

    let component;
    switch (currentRoom) {
        case RoomOptions.QuickPairing:
            component = (
                <QuickPairing
                    className={styles.quickPairing}
                />
            );
            break;
        case RoomOptions.Lobby:
            component = (
                <LobbyGames
                    className={styles.lobbyGames}
                    lobby={lobby.filter(({ mode }) => mode !== GameModes.Correspondence )}
                />
            );
            break;
        case RoomOptions.Correspondence:
            component = (
                <LobbyGames
                    className={styles.lobbyGames}
                    lobby={lobby.filter(({ mode }) => mode === GameModes.Correspondence )}
                />
            );
            break;
        case RoomOptions.InProgress:
            component = (
                <GamesInProgress
                    className={styles.gamesInProgress}
                    gamesInPlay={gamesInPlay}
                />
            );
            break;
        default:
            return null;
    }

    return (
        <div
            ref={rootRef}
            className={cn(styles.root, className)}
        >
            {component}
        </div>
    );
};

export default Options
