import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

export interface PositionDiffProps {
    className?: string;
    positionDiff: number;
}

export const PositionDiff: FC<PositionDiffProps> = ({
    className,
    positionDiff,
}) => {

    return (
        <div className={cn(
            styles.root,
            className,
            positionDiff > 0 ?
                    styles.positive :
                    positionDiff < 0 ?
                        styles.negative:
                        styles.static
        )}>
            <i className={cn(
                styles.positionDiff,
                positionDiff > 0 ?
                    'gg-arrow-top-right' :
                    positionDiff < 0 ?
                        'gg-arrow-bottom-right':
                        null
            )}/>
            <span className={styles.diffNum}>{Math.abs(positionDiff)}</span>
        </div>
    );
};

export default PositionDiff
