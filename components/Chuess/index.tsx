import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import {
  init,
  moveTo,
  resign,
  draw,
  boardSelector,
  movePiece,
  chuessBoardSelector,
  lastChuessMoveSelector,
  isCurrentUserTurn,
} from '../../redux/board';
import { currentTurn } from '../../redux/util';
import { userSelector } from '../../redux/user';

export interface ChuessProps {
  className?: string;
}

export const Chuess: FC<ChuessProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const {
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
    history,
    future,
    isMovingOver,
    isMovingFrom,
  } = useSelector(boardSelector);
  const board = useSelector(chuessBoardSelector);
  const lastMove = useSelector(lastChuessMoveSelector);
  const isCurrentTurn = useSelector(isCurrentUserTurn);

  useEffect(() => {
    dispatch(init());
  }, []);

  const handleMove = (pos?: number) => {
    dispatch(moveTo(pos));
  };

  const handleResign = () => {
    dispatch(resign(true));
  };
  
  const handleDraw = () => {
    dispatch(draw(true));
  };

  useEffect(() => {
    if (fen) {
      const color = currentTurn(fen);
      const isCurrentTurn = (
        (color === 'white' && whitePlayer === user) ||
        (color === 'black' && blackPlayer === user)
      );
      if (isCurrentTurn) {
        for (let { from, to } of premoves) {
          if (validMoves[from] && validMoves[from].includes(to)) {
            dispatch(movePiece({ from, to }));
            return;
          }
        }
      }
    }
  }, [
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
    user,
  ]);

  return (
    <div className={cn(styles.root, className, {
      [styles.isCurrentTurn]: isCurrentTurn,
    })}>
      <Board
        className={styles.board}
        moveTo={handleMove}
        validMoves={validMoves}
        isMovingOver={isMovingOver}
        isMovingFrom={isMovingFrom}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        future={future}
        premoves={premoves}
        board={board}
        lastMove={lastMove}
        user={user}
      />
      <GameDetails
        className={styles.details}
        onResign={handleResign}
        onDraw={handleDraw}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        history={history}
        future={future}
        lastMove={lastMove}
        board={board}
        user={user}
      />
    </div>
  );
};

export default Chuess;
