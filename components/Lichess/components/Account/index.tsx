import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { User } from '../../../../redux/user';

export interface AccountProps {
    className?: string;
    user: User;
}

export const Account: FC<AccountProps> = ({
    className,
    user,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <button className={cn(styles.searchIcon, 'gg-search')}/>
            <button className={cn(styles.boltIcon, 'gg-bolt')}/>
            <button className={cn(styles.bellIcon, 'gg-bell')}/>
            <span className={styles.userName}>{user.name}</span>
        </div>
    );
};

export default Account
