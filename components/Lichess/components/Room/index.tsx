import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Nav from './components/Nav';
import Options from './components/Options';
import { RoomOptions } from './types';
import { Game, LobbyGame } from '../../../../redux/lichess';

export interface RoomProps {
    className?: string;
    lobby: LobbyGame[];
    numGamesInPlay: number;
    gamesInPlay: Game[];
}

export const Room: FC<RoomProps> = ({
    className,
    lobby,
    numGamesInPlay,
    gamesInPlay,
}) => {
    const [currentRoom, setCurrentRoom] = useState(RoomOptions.QuickPairing);

    return (
        <div className={cn(styles.root, className)}>
            <Nav
                className={styles.nav}
                currentRoom={currentRoom}
                onChangeCurrentRoom={setCurrentRoom}
                numGamesInPlay={numGamesInPlay}
            />
            <Options
                className={styles.options}
                currentRoom={currentRoom}
                lobby={lobby}
                gamesInPlay={gamesInPlay}
            />
        </div>
    );
};

export default Room
