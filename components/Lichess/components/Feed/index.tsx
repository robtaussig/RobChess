import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Streamer, Event, HistoryItem } from '../../../../redux/lichess';
import Streamers from '../Streamers';
import Events from '../Events';
import History from '../History';

export interface AccountProps {
    className?: string;
    streamers: Streamer[];
    events: Event[];
    history: HistoryItem[];
}

export const Account: FC<AccountProps> = ({
    className,
    streamers,
    events,
    history,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <Streamers
                className={styles.streamers}
                streamers={streamers}
            />
            <Events
                className={styles.events}
                events={events}
            />
            <History
                className={styles.history}
                history={history}
            />
        </div>
    );
};

export default Account
