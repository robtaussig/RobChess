import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import MobileToolbar from './components/MobileToolbar';

export interface MobileMenuProps {
    className?: string;
}

export const MobileMenu: FC<MobileMenuProps> = ({
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cn(styles.root, className, {
            [styles.open]: isOpen,
        })}>
            {isOpen ? (
                <button
                    className={cn(styles.closeIcon, 'gg-close')}
                    onClick={() => setIsOpen(false)}
                />
            ) : (
                <button
                    className={cn(styles.menuIcon, 'gg-menu')}
                    onClick={() => setIsOpen(true)}
                />
            )}
            {isOpen && (<div className={styles.overlay}/>)}
            <div
                className={cn(styles.menu, {
                    [styles.open]: isOpen,
                })}
            >
                <MobileToolbar className={styles.mobileToolbar}/>
            </div>
        </div>
        
    );
};

export default MobileMenu
