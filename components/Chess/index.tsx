import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import {
  boardSelector,
  isCurrentUserTurn,
} from '../../redux/board';
import { userSelector } from '../../redux/user';
import {
  networkSelector,
} from '../../redux/network';
import { useMultiplayer } from '../../hooks/use-multiplayer';
import MultiplayerGameDetails from '../MultiplayerGameDetails';

export interface ChessProps {
  className?: string;
}

export const Chess: FC<ChessProps> = ({
  className,
}) => {
  const {
    room,
    invitedBy,
  } = useSelector(networkSelector);
  const user = useSelector(userSelector);
  const {
    whitePlayer,
    blackPlayer,
    playerState,
    opponentState,
    fen,
    premoves,
    validMoves,
    history,
    future,
    lastMove,
    isMovingOver,
    isMovingFrom,
    isPromoting,
  } = useSelector(boardSelector);
  const isCurrentTurn = useSelector(isCurrentUserTurn);
  const {
    handleAcceptChallenge,
    handleRejectChallenge,
    handleMove,
    handleResign,
    handleDraw,
    handlePlayAgain,
    handleGoBack,
    handlePromote,
  } = useMultiplayer(
    fen,
    premoves,
    validMoves,
    whitePlayer,
    blackPlayer,
  );

  return (
    <div className={cn(styles.root, className)}>
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
        board={fen}
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
        board={fen}
        user={user}
        isPromoting={isCurrentTurn && isPromoting}
        onPromote={handlePromote}
      />
    </div>
  );
};

export default Chess;
