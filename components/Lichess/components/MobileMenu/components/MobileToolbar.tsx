import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { Options } from '../../../constants/ToolbarOptions';

export interface MobileToolbarProps {
    className?: string;
}

export const MobileToolbar: FC<MobileToolbarProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            {Options.map(({ text, items }) => (
                <div
                    key={`${text}-group`}
                    className={styles.group}
                >
                    <h2 className={styles.itemHeader}>{text === 'Play' ? 'robchess.com' : text}</h2>
                    {items.map(({ label, onClick }) => (
                        <button
                            key={`${label}-${text}-sub-item`}
                            className={styles.button}
                            onClick={onClick}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MobileToolbar
