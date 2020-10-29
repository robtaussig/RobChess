import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User as UserType } from '../../../../../../redux/user';

export interface UserProps {
  className?: string;
  user: UserType;
  inviting: string;
  onInvite: () => void;
}

export const User: FC<UserProps> = ({
  className,
  user,
  inviting,
  onInvite,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.name}>{user.name.slice(0, 7)}</span>
      {inviting === null ? (
        <button className={styles.challengeButton} onClick={onInvite}>Challenge</button>
      ) : inviting === user.name ? (
        <span className={styles.invitingMessage}>Awaiting response</span>
      ) : null}
    </div>
  );
};

export default User;
