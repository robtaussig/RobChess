import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Account from '../Account';
import Toolbar from '../Toolbar';

export interface NavProps {
    className?: string;
}

export const Nav: FC<NavProps> = ({
    className,
}) => {

    return (
        <nav className={cn(styles.root, className)}>
            <Toolbar className={styles.toolbar} />
            <Account className={styles.account} />
        </nav>
    );
};

export default Nav
