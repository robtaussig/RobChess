import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

export interface AccountProps {
    className?: string;
}

export const Account: FC<AccountProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <button className={styles.createGame}>Create a game</button>
            <button className={styles.playFriend}>Play with a friend</button>
            <button className={styles.playCpu}>Play with the computer</button>
        </div>
    );
};

export default Account
