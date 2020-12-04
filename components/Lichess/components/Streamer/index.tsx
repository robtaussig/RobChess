import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Streamer as StreamerType } from '../../../../redux/lichess';

export interface StreamerProps {
    className?: string;
    streamer: StreamerType;
}

export const Streamer: FC<StreamerProps> = ({
    className,
    streamer,
}) => {

    return (
        <button className={cn(styles.root, className)}>
            <i className={cn(styles.micIcon, 'gg-mic')}/>
            <span className={styles.name}>{streamer.name}</span>
            <span className={styles.description}>{streamer.description}</span>
        </button>
    ); 
};

export default Streamer
