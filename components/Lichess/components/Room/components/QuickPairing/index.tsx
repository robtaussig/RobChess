import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { QuickPairingOptions } from '../../constants';

export interface QuickPairingProps {
    className?: string;
}

export const QuickPairing: FC<QuickPairingProps> = ({
    className,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            {QuickPairingOptions.map(({ time, mode }) => {
                return (
                    <button key={`${time}-${mode}-quick-pairing`} className={styles.button}>
                        {time && (<p className={styles.time}>{time}</p>)}
                        <p className={styles.mode}>{mode}</p>
                    </button>
                );
            })}
        </div>
    );
};

export default QuickPairing
