import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Leader as LeaderType } from '../../../../redux/lichess';
import Leader from './components/Leader';

export interface LeaderBoardProps {
    className?: string;
    leaderboard: LeaderType[];
}

export const LeaderBoard: FC<LeaderBoardProps> = ({
    className,
    leaderboard,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <div className={styles.header}>
                <i className={styles.icon}/>
                <span className={styles.headerText}>Leaderboard</span>
                <button className={styles.moreButton}>More »</button>
            </div>
            <div className={styles.leaders}>
                {leaderboard.map((leader, idx) => {
                    return (
                        <Leader
                            key={`${leader.playerId}-leader`}
                            className={cn(styles.leader, {
                                [styles.oddRow]: idx % 2 === 1,
                            })}
                            leader={leader}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LeaderBoard
