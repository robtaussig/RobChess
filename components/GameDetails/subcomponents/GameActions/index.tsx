import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface GameActionsProps {
  className?: string;
  onResign: () => void;
  onDraw: () => void;
}

export const GameActions: FC<GameActionsProps> = ({
  className,
  onResign,
  onDraw,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <button
        className={styles.resign}
        onClick={onResign}
      >
        Resign
      </button>
      <button
        className={styles.draw}
        onClick={onDraw}
      >
        Draw
      </button>
    </div>
  );
};

export default GameActions;
