import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { RoomJoinStatus } from '../../../../redux/network';

export interface CurrentRoomProps {
  className?: string;
  room: string;
  status: RoomJoinStatus;
}

export const CurrentRoom: FC<CurrentRoomProps> = ({
  className,
  room,
  status,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.status}>{status}</span> {room}
    </div>
  );
};

export default CurrentRoom;
