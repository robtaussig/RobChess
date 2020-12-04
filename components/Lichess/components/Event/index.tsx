import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Event as EventType } from '../../../../redux/lichess';
import { formatDistance } from 'date-fns';

export interface EventProps {
    className?: string;
    event: EventType;
}

export const Event: FC<EventProps> = ({
    className,
    event,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <i className={cn(styles.eventIcon, 'gg-games')}/>
            <span className={styles.title}>{event.title}</span>
            <span className={styles.players}>{event.participantIds.length} players • </span>
            <span className={styles.time}>{formatDistance(new Date(event.time), new Date())}</span>
        </div>
    );
};

export default Event
