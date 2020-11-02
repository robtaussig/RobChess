import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';

export interface ChallengedMessageProps {
  className?: string;
  by: string;
  onReject: () => void;
  onAccept: () => void;
}

export const ChallengedMessage: FC<ChallengedMessageProps> = ({
  className,
  by,
  onReject,
  onAccept,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <p className={styles.challenger}>
        You have been challenged by <b>{by.slice(0,7)}</b>
      </p>
      <button className={styles.rejectButton} onClick={onReject}>
        Reject
      </button>
      <button className={styles.acceptButton} onClick={onAccept}>
        Accept
      </button>
    </div>
  );
};

export default ChallengedMessage;
