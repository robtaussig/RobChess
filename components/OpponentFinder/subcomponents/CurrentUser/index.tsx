import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { User } from '../../../../redux/user';

export interface CurrentUserProps {
  className?: string;
  user: User;
}

export const CurrentUser: FC<CurrentUserProps> = ({
  className,
  user,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      You are <b>{user.name.slice(0, 7)}</b> ({user.rating})
    </div>
  );
};

export default CurrentUser;
