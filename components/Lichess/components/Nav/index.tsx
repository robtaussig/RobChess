import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Account from '../Account';
import Toolbar from '../Toolbar';
import { User } from '../../../../redux/user';
import MobileMenu from '../MobileMenu';

export interface NavProps {
    className?: string;
    user: User;
}

export const Nav: FC<NavProps> = ({
    className,
    user,
}) => {

    return (
        <nav className={cn(styles.root, className)}>
            <MobileMenu className={styles.mobileMenu} />
            <Toolbar className={styles.toolbar} />
            <Account className={styles.account} user={user} />
        </nav>
    );
};

export default Nav
