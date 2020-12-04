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
            
        </div>
    );
};

export default Account
