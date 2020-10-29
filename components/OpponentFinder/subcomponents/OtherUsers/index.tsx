import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User as UserType } from '../../../../redux/user';
import User from './subcomponents/User';

export interface OtherUsersProps {
  className?: string;
  users: UserType[];
}

export const OtherUsers: FC<OtherUsersProps> = ({
  className,
  users,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      {users.map(user => {
        return (
          <User
            key={user.name}
            className={styles.user}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default OtherUsers;
