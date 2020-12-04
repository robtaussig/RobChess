import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Option from './components/Option';
import { Options } from '../../constants/ToolbarOptions';

export interface ToolbarProps {
    className?: string;
}

export const Toolbar: FC<ToolbarProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            <h1 className={styles.header}>robchess<span>.com</span></h1>
            <ul className={styles.options}>
                {Options.map(({ text, items }) => (
                    <Option
                        key={`${text}-option`}
                        className={styles.option}
                        text={text}
                        subOptions={items}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Toolbar
