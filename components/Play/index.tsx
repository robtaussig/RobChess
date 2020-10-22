import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user';

export interface PlayProps {
  className?: string;
  
}

export const Play: FC<PlayProps> = ({
  className,
}) => {
  const user = useSelector(userSelector);
  
  return (
    <div className={cn(styles.root, className)}>

    </div>
  );
};

export default Play;
