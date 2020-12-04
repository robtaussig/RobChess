import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { RoomOptions } from '../../types';

export interface NavProps {
    className?: string;
    currentRoom: RoomOptions;
    numGamesInPlay: number;
    onChangeCurrentRoom: (room: RoomOptions) => void;
}

const options = [
    {
        room: RoomOptions.QuickPairing,
        text: 'Quick pairing',
    },
    {
        room: RoomOptions.Lobby,
        text: 'Lobby',
    },
    {
        room: RoomOptions.Correspondence,
        text: 'Correspondence',
    },
    {
        room: RoomOptions.InProgress,
        text: '12 games in play',
    },
];

export const Nav: FC<NavProps> = ({
    className,
    currentRoom,
    onChangeCurrentRoom,
    numGamesInPlay,
}) => {

    
    return (
        <ul className={cn(styles.root, className)}>
            {options.map(({ room, text }) => {
                return (
                    <li
                        key={`${room}-nav`}
                        className={cn(styles.navOption, {
                            [styles.isCurrentRoom]: currentRoom === room,
                        })}
                    >
                        <button
                            className={styles.navButton}
                            onClick={() => onChangeCurrentRoom(room)}
                        >
                            {room === RoomOptions.InProgress ?
                                `${numGamesInPlay} ${numGamesInPlay === 1 ? 'game' : 'games'} in play` :
                                text
                            }
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default Nav
