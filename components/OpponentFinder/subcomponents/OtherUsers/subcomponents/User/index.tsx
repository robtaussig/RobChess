import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User as UserType } from '../../../../../../redux/user';

export interface UserProps {
  className?: string;
  user: UserType;
}

export const User: FC<UserProps> = ({
  className,
  user,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.name}>{user.name.slice(0, 7)}</span>
      <button className={styles.challengeButton}>Challenge</button>
    </div>
  );
};

export default User;
