import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import {
  boardSelector,
  isCurrentUserTurn,
} from '../../redux/board';
import {
  chuessBoardSelector,
  lastChuessMoveSelector,
  validChuessMovesSelector,
  chuessSelector,
  peek,
} from '../../redux/chuess';
import { userSelector } from '../../redux/user';
import {
  networkSelector,
} from '../../redux/network';
import { getValidMoves } from '../../redux/util';
import { useMultiplayer } from '../../hooks/use-multiplayer';
import MultiplayerGameDetails from '../MultiplayerGameDetails';

export interface ChuessProps {
  className?: string;
}

export const Chuess: FC<ChuessProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const {
    room,
    invitedBy,
  } = useSelector(networkSelector);
  const user = useSelector(userSelector);
  const {
    peeksLeft,
    peeked,
  } = useSelector(chuessSelector);
  const {
    fen,
    whitePlayer,
    blackPlayer,
    playerState,
    opponentState,
    premoves,
    history,
    future,
    isMovingOver,
    isMovingFrom,
  } = useSelector(boardSelector);
  const board = useSelector(chuessBoardSelector);
  const lastMove = useSelector(lastChuessMoveSelector);
  const isCurrentTurn = useSelector(isCurrentUserTurn);
  const validMoves = useSelector(validChuessMovesSelector);

  const {
    handleAcceptChallenge,
    handleRejectChallenge,
    handleMove,
    handleResign,
    handleDraw,
    handlePlayAgain,
    handleGoBack,
    movePieceAndPropagate,
  } = useMultiplayer(
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
  );

  const handleCommmitMoves = () => {
    const validMoves = getValidMoves(fen);

    for (let { from, to } of premoves) {
      if (validMoves[from] && validMoves[from].includes(to)) {
        movePieceAndPropagate(from, to);
        return;
      }
    }
    
    const allValidMoves = Object.entries(validMoves)
      .reduce((next, [from, to]) => {
        to.forEach(toMove => {
          next.push([Number(from), toMove]);
        })
        return next;
      }, [] as [number, number][]);

    const [from, to] = allValidMoves[Math.floor(Math.random() * allValidMoves.length)];
    movePieceAndPropagate(from, to);
  };

  const handlePeek = () => {
    dispatch(peek());
  };

  const canPeek = isCurrentTurn && !peeked && peeksLeft > 0;

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
        isLive
      />
      <MultiplayerGameDetails
        styles={styles}
        invitedBy={invitedBy}
        handleAcceptChallenge={handleAcceptChallenge}
        handleRejectChallenge={handleRejectChallenge}
        room={room}
        opponentState={opponentState}
        playerState={playerState}
        handlePlayAgain={handlePlayAgain}
        handleGoBack={handleGoBack}
        handleDraw={handleDraw}
        handleResign={handleResign}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        history={history}
        future={future}
        lastMove={lastMove}
        board={board}
        user={user}
        onCommitMoves={isCurrentTurn && premoves.length > 0 && handleCommmitMoves}
        onPeek={canPeek && handlePeek}
        peeksLeft={peeksLeft}
        canTimeTravel={false}
      />
    </div>
  );
};

export default Chuess;
