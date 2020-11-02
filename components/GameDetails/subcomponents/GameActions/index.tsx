import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface GameActionsProps {
  className?: string;
  onResign: () => void;
  onDraw: () => void;
  onCommitMoves: () => void;
  onPeek: () => void;
}

export const GameActions: FC<GameActionsProps> = ({
  className,
  onResign,
  onDraw,
  onCommitMoves,
  onPeek,
}) => {

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
          onClick={onResign}
        >
          Resign
        </button>
      )}
      {onPeek ? (
        <button
          className={styles.peek}
          onClick={onPeek}
        >
          Peek
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
