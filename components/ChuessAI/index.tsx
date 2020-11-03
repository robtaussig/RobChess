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
  isCurrentUserTurn,
  promote,
} from '../../redux/board';
import {
  chuessBoardSelector,
  lastChuessMoveSelector,
  validChuessMovesSelector,
  chuessSelector,
  peek,
} from '../../redux/chuess';
import { getValidMoves } from '../../redux/util';
import { userSelector } from '../../redux/user';

export interface ChuessAIProps {
  className?: string;
}

export const ChuessAI: FC<ChuessAIProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const {
    peeksLeft,
    peeked,
  } = useSelector(chuessSelector);
  const {
    fen,
    premoves,
    whitePlayer,
    blackPlayer,
    history,
    future,
    isMovingOver,
    isMovingFrom,
    isPromoting,
  } = useSelector(boardSelector);
  const board = useSelector(chuessBoardSelector);
  const lastMove = useSelector(lastChuessMoveSelector);
  const isCurrentTurn = useSelector(isCurrentUserTurn);
  const validMoves = useSelector(validChuessMovesSelector);

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

  const handlePeek = () => {
    dispatch(peek());
  };

  const handlePromote = (piece: string) => {
    dispatch(promote(piece));
  };

  const handleCommmitMoves = () => {
    const validMoves = getValidMoves(fen);
    for (let { from, to } of premoves) {
      if (validMoves[from] && validMoves[from].includes(to)) {
        dispatch(movePiece({ from, to }));
        return;
      }
    }
    
    const allValidMoves = Object.entries(validMoves)
      .reduce((next, [from, to]) => {
        to.forEach(toMove => {
          next.push([Number(from), toMove]);
        })
        return next;
      }, [] as [number, number, string?][]);

    const [from, to] = allValidMoves[Math.floor(Math.random() * allValidMoves.length)];
    dispatch(movePiece({ from, to }));
  };

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
        onCommitMoves={premoves.length > 0 && handleCommmitMoves}
        onPeek={!peeked && peeksLeft > 0 && handlePeek}
        onPromote={handlePromote}
        peeksLeft={peeksLeft}
        canTimeTravel={false}
        isPromoting={isPromoting}
      />
    </div>
  );
};

export default ChuessAI;
