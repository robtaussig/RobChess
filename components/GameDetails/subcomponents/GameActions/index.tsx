import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import IconButton from '../../../General/IconButton';

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
  const [isDrawing, setIsDrawing] = useState(false);

  if (isResigning) {
    return (
      <div className={cn(styles.root, className)}>
        <span className={styles.actionHeader}>Resign ?</span>
        <IconButton
          className={styles.confirm}
          icon={'gg-check'}
          size={1.5}
          onClick={onResign}
        />
        <IconButton
          className={styles.cancel}
          icon={'gg-close'}
          onClick={() => setIsResigning(false)}
        />
      </div>
    );
  }

  if (isDrawing) {
    return (
      <div className={cn(styles.root, className)}>
        <span className={styles.actionHeader}>Draw ?</span>
        <IconButton
          className={styles.confirm}
          icon={'gg-check'}
          size={1.5}
          onClick={onDraw}
        />
        <IconButton
          className={styles.cancel}
          icon={'gg-close'}
          onClick={() => setIsDrawing(false)}
        />
      </div>
    );
  }

  return (
    <div className={cn(styles.root, className)}>
      <IconButton
        className={styles.resign}
        icon={'gg-smile-sad'}
        onClick={() => setIsResigning(true)}
      />
      {onCommitMoves ? (
        <button
          className={styles.commit}
          onClick={onCommitMoves}
        >
          Move
        </button>
      ) : onPeek ? (
        <button
          className={styles.peek}
          onClick={onPeek}
        >
          Peek ({peeksLeft})
        </button>
      ) : (
          <IconButton
          className={cn(styles.draw)}
          icon={'gg-sync'}
          onClick={() => setIsDrawing(true)}
        />
      )}
    </div>
  );
};

export default GameActions;
