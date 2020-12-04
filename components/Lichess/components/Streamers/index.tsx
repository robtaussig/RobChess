import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Streamer as StreamerType } from '../../../../redux/lichess';
import Streamer from '../Streamer';

export interface StreamersProps {
    className?: string;
    streamers: StreamerType[];
}

export const Streamers: FC<StreamersProps> = ({
    className,
    streamers,
}) => {

    return (
        <ul className={cn(styles.root, className)}>
            {streamers.map(streamer => {
                return (
                    <Streamer
                        key={`${streamer.name}-streamer`}
                        streamer={streamer}
                        className={styles.streamer}
                    />
                );
            })}
            <button className={styles.streamersButton}>Streamers»</button>
        </ul>
    );
};

export default Streamers
