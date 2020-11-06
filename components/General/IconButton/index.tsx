import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface IconButtonProps {
    className?: string;
    icon: string;
    size?: number;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const IconButton: FC<IconButtonProps> = ({
    className,
    icon,
    size = 1,
    onClick,
}) => {
    
    return (
        <button
            className={cn(styles.root, className, icon)}
            style={{
                transform: `scale(var(--ggs, ${size}))`,
            }}
            onClick={onClick}    
        />
    );
};

export default IconButton;
