import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

export interface OptionProps {
    className?: string;
}

export const Option: FC<OptionProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            
        </div>
    );
};

export default Option
