import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Button from '../../../Button';
import { goBack, goForward } from '../../../../redux/board';

export interface TimeTravelButtonsProps {
  className?: string;
  hasHistory: boolean;
  hasFuture: boolean;
}

export const TimeTravelButtons: FC<TimeTravelButtonsProps> = ({
  className,
  hasHistory,
  hasFuture,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(styles.root, className)}>
      <Button
        disabled={!hasHistory}
        onClick={() => dispatch(goBack())}
      >
        Back
      </Button>
      <Button
        disabled={!hasFuture}
        onClick={() => dispatch(goForward())}
      >
        Forward
      </Button>
    </div>
  );
};

export default TimeTravelButtons;
