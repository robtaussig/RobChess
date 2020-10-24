import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { User } from '../../../../redux/user';
import Player from './subcomponents/Player';

export interface PlayerDetailsProps {
    className?: string;
    whitePlayer: User;
    blackPlayer: User;
    user: User;
}

export const PlayerDetails: FC<PlayerDetailsProps> = ({
    className,
    whitePlayer,
    blackPlayer,
    user,
}) => {
    
    return (
        <div className={cn(styles.root, className)}>
            <Player user={whitePlayer} isUser={user === whitePlayer} white/>
            <Player user={blackPlayer} isUser={user === blackPlayer} black/>
        </div>
    );
};

export default PlayerDetails;
