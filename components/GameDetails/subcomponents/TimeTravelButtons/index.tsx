import React, { FC } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Button from '../../../Button';
import { Moment, goBack, goForward } from '../../../../redux/board';

export interface TimeTravelButtonsProps {
  className?: string;
  history: Moment[];
  future: Moment[];
}

export const TimeTravelButtons: FC<TimeTravelButtonsProps> = ({
  className,
  history,
  future,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(styles.root, className)}>
      <Button
        className={styles.button}
        disabled={history?.length === 0 ?? false}
        onClick={() => dispatch(goBack())}
      >
        Back
      </Button>
      <Button
        className={styles.button}
        disabled={future?.length === 0 ?? false}
        onClick={() => dispatch(goForward())}
      >
        Forward
      </Button>
    </div>
  );
};

export default TimeTravelButtons;
