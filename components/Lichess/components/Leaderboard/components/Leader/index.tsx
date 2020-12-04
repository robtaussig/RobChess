import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Leader as LeaderType } from '../../../../../../redux/lichess';
import PositionDiff from '../PositionDiff';

export interface LeaderProps {
    className?: string;
    leader: LeaderType;
}

export const Leader: FC<LeaderProps> = ({
    className,
    leader,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <span className={styles.playerIcon}><i className={styles.icon}/></span>
            <span className={styles.playerId}>{leader.playerId}</span>
            <span className={styles.rating}>{leader.rating}</span>
            <PositionDiff
                className={styles.positionDiff}
                positionDiff={leader.positionDiff}
            />
        </div>
    );
};

export default Leader
