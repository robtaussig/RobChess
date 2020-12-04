import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface OptionProps {
    className?: string;
    text: string;
    subOptions: { label: string; onClick: () => void }[]
}

export const Option: FC<OptionProps> = ({
    className,
    text,
    subOptions,
}) => {

    return (
        <li className={cn(styles.root, className)}>
            {text}
            <div className={styles.subOptions}>
                {subOptions.map(({ label, onClick }) => {
                    return (
                        <button
                            key={`${label}-sub-option`}
                            className={styles.subOption}
                            onClick={onClick}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            
        </li>
    );
};

export default Option
