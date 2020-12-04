import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Event as EventType } from '../../../../redux/lichess';
import Event from '../Event';

export interface EventsProps {
    className?: string;
    events: EventType[];
}

export const Events: FC<EventsProps> = ({
    className,
    events,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            {events.map(event => {
                return (
                    <Event
                        key={`${event.title}-event`}
                        className={styles.event}
                        event={event}
                    />
                );
            })}
        </div>
    );
};

export default Events
