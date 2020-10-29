import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { networkSelector } from '../../redux/network';
import { userSelector } from '../../redux/user';
import CurrentUser from './subcomponents/CurrentUser';
import CurrentRoom from './subcomponents/CurrentRoom';
import OtherUsers from './subcomponents/OtherUsers';

export interface OpponentFinderProps {
  className?: string;
  
}

export const OpponentFinder: FC<OpponentFinderProps> = ({
  className,
}) => {
  const { users, room, status } = useSelector(networkSelector);
  const user = useSelector(userSelector);

  return (
    <div className={cn(styles.root, className)}>
      <CurrentUser
        className={styles.currentUser}
        user={user}
      />
      <CurrentRoom
        className={styles.currentRoom}
        room={room}
        status={status}
      />
      <OtherUsers
        className={styles.otherUsers}
        users={users}
      />
    </div>
  );
};

export default OpponentFinder;
