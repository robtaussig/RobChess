import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface GameActionsProps {
  className?: string;
}

export const GameActions: FC<GameActionsProps> = ({
  className,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <button
        className={styles.resign}
        onClick={console.log}
      >
        Resign
      </button>
      <button
        className={styles.draw}
        onClick={console.log}
      >
        Offer Draw
      </button>
    </div>
  );
};

export default GameActions;
