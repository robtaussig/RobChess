import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { TournamentWinner as TournamentWinnerType } from '../../../../../../redux/lichess';

export interface TournamentWinnerProps {
    className?: string;
    tournamentWinner: TournamentWinnerType;
}

export const TournamentWinner: FC<TournamentWinnerProps> = ({
    className,
    tournamentWinner,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.playerIcon}><i className={styles.icon}/></span>
            <span className={styles.playerId}>{tournamentWinner.playerId}</span>
            <span className={styles.tournament}>{tournamentWinner.tournamentId}</span>
        </div>
    );
};

export default TournamentWinner
