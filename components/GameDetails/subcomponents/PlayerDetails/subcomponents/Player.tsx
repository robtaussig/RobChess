import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { User } from '../../../../../redux/user';

export interface PlayerProps {
    className?: string;
    user: User;
    isUser: boolean;
    white?: boolean;
    black?: boolean;
}

export const Player: FC<PlayerProps> = ({
    className,
    user,
    isUser,
    white = false,
    black = false,
}) => {
    
    return (
        <div className={cn(styles.root, className, {
            [styles.white]: white,
            [styles.black]: black,
            [styles.isUser]: isUser,
        })}>
           <span className={styles.name}>{user.name}</span>
           <span className={styles.rating}>{user.rating}</span>
        </div>
    );
};

export default Player;
