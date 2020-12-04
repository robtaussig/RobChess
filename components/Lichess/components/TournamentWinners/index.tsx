import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { TournamentWinner as TournamentWinnerType } from '../../../../redux/lichess';
import TournamentWinner from './components/TournamentWinner';

export interface TournamentWinnersProps {
    className?: string;
    tournamentWinners: TournamentWinnerType[];
}

export const TournamentWinners: FC<TournamentWinnersProps> = ({
    className,
    tournamentWinners,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <div className={styles.header}>
                <i className={styles.icon}/>
                <span className={styles.headerText}>Tournament winners</span>
                <button className={styles.moreButton}>More »</button>
            </div>
            <div className={styles.tournamentWinners}>
                {tournamentWinners.map((tournamentWinner, idx) => {
                    return (
                        <TournamentWinner
                            key={`${tournamentWinner.playerId}-tournamentWinner`}
                            className={cn(styles.tournamentWinner, {
                                [styles.oddRow]: idx % 2 === 1,
                            })}
                            tournamentWinner={tournamentWinner}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default TournamentWinners
