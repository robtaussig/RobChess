import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface GameActionsProps {
  className?: string;
  onResign: () => void;
  onDraw: () => void;
  onCommitMoves: () => void;
  onPeek?: () => void;
  peeksLeft?: number;
}

export const GameActions: FC<GameActionsProps> = ({
  className,
  onResign,
  onDraw,
  onCommitMoves,
  onPeek,
  peeksLeft,
}) => {
  const [isResigning, setIsResigning] = useState(false);

  return (
    <div className={cn(styles.root, className)}>
      {onCommitMoves ? (
        <button
          className={styles.commit}
          onClick={onCommitMoves}
        >
          Move
        </button>
      ) : (
        <button
          className={styles.resign}
          onClick={isResigning ? onResign : () => setIsResigning(true)}
        >
          {isResigning ? 'Confirm' : 'Resign'}
        </button>
      )}
      {isResigning ? (
        <button
          className={styles.cancel}
          onClick={() => setIsResigning(false)}
        >
          Cancel
        </button>
      ) : onPeek ? (
        <button
          className={styles.peek}
          onClick={onPeek}
        >
          Peek ({peeksLeft})
        </button>
      ) : (
        <button
          className={styles.draw}
          onClick={onDraw}
        >
          Draw
        </button>
      )}
    </div>
  );
};

export default GameActions;
