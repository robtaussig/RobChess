import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import cn from 'classnames';
import { Moment, claimSeat, assignAI, AI_PLAYER } from '../../../../redux/board';
import { User } from '../../../../redux/user';
import Player from './subcomponents/Player';

export interface PlayerDetailsProps {
    className?: string;
    whitePlayer: User;
    blackPlayer: User;
    user: User;
    history: Moment[];
}

export const PlayerDetails: FC<PlayerDetailsProps> = ({
    className,
    whitePlayer,
    blackPlayer,
    history,
    user,
}) => {
    const dispatch = useDispatch();

    const handleClaimSeat = (color: 'white' | 'black') => {
        dispatch(claimSeat({ user, color }));
    };

    const handleAssignAI = (color: 'white' | 'black') => {
        dispatch(assignAI(color));
    };

    const handleUnseat = (color: 'white' | 'black') => {
        dispatch(claimSeat({ user: null, color }));
    };

    return (
        <div className={cn(styles.root, className)}>
            <Player
                className={styles.whitePlayer}
                player={whitePlayer}
                onClaimSeat={handleClaimSeat}
                onAssignAI={handleAssignAI}
                canUnseat={whitePlayer && (whitePlayer === user || whitePlayer === AI_PLAYER)}
                onUnseat={handleUnseat}
                currentTurn={history.length % 2 === 0}
                canClaim={blackPlayer !== user}
                white
            />
            {whitePlayer && blackPlayer && (<span className={styles.vs}>-vs-</span>)}
            <Player
                className={styles.blackPlayer}
                player={blackPlayer}
                onClaimSeat={handleClaimSeat}
                onAssignAI={handleAssignAI}
                canUnseat={blackPlayer && (blackPlayer === user || blackPlayer === AI_PLAYER)}
                onUnseat={handleUnseat}
                currentTurn={history.length % 2 === 1}
                canClaim={whitePlayer !== user}
                black
            />
        </div>
    );
};

export default PlayerDetails;
