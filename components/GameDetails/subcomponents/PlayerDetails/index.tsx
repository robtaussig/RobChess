import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import cn from 'classnames';
import { boardSelector, claimSeat, assignAI, AI_PLAYER } from '../../../../redux/board';
import { userSelector } from '../../../../redux/user';
import Player from './subcomponents/Player';

export interface PlayerDetailsProps {
    className?: string;
}

export const PlayerDetails: FC<PlayerDetailsProps> = ({
    className,
}) => {
    const dispatch = useDispatch();
    const {
        whitePlayer,
        blackPlayer,
    } = useSelector(boardSelector);
    const user = useSelector(userSelector);

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
                white
            />
            <Player
                className={styles.blackPlayer}
                player={blackPlayer}
                onClaimSeat={handleClaimSeat}
                onAssignAI={handleAssignAI}
                canUnseat={blackPlayer && (blackPlayer === user || blackPlayer === AI_PLAYER)}
                onUnseat={handleUnseat}
                black
            />
        </div>
    );
};

export default PlayerDetails;
