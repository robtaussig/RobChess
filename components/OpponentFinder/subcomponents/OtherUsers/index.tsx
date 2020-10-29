import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User as UserType } from '../../../../redux/user';
import { invite } from '../../../../redux/network';
import User from './subcomponents/User';

export interface OtherUsersProps {
  className?: string;
  users: UserType[];
  inviting: string;
}

export const OtherUsers: FC<OtherUsersProps> = ({
  className,
  users,
  inviting,
}) => {
  const dispatch = useDispatch();

  const handleInvite = (name: string) => () => {
    dispatch(invite(name));
  };

  return (
    <div className={cn(styles.root, className)}>
      {users.map(user => {
        return (
          <User
            key={user.name}
            className={styles.user}
            user={user}
            inviting={inviting}
            onInvite={handleInvite(user.name)}
          />
        );
      })}
    </div>
  );
};

export default OtherUsers;
