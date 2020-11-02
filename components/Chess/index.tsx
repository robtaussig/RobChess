import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import {
  boardSelector,
  PlayerState,
} from '../../redux/board';
import { userSelector } from '../../redux/user';
import {
  networkSelector,
  MAIN_ROOM,
} from '../../redux/network';
import OpponentFinder from '../OpponentFinder';
import ChallengedMessage from './subcomponents/ChallengedMessage';
import GameOver from './subcomponents/GameOver';
import { useMultiplayer } from '../../hooks/use-multiplayer';

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
  } = useSelector(boardSelector);
  const {
    handleAcceptChallenge,
    handleRejectChallenge,
    handleMove,
    handleResign,
    handleDraw,
    handlePlayAgain,
    handleGoBack,
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
      {invitedBy ? (
        <ChallengedMessage
          className={styles.challengedMessage}
          by={invitedBy}
          onAccept={handleAcceptChallenge}
          onReject={handleRejectChallenge}
        />
      ) : room === MAIN_ROOM ? (
        <OpponentFinder
          className={styles.opponentFinder}
        />
      ) : opponentState === PlayerState.Resigned ||
          playerState === PlayerState.Resigned ? (
        <GameOver
          className={styles.gameOver}
          opponentState={opponentState}
          playerState={playerState}
          onPlayAgain={handlePlayAgain}
          onGoBack={handleGoBack}
          onDraw={handleDraw}
        />
      ) :(
        <GameDetails
          className={styles.details}
          onResign={handleResign}
          onDraw={handleDraw}
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          history={history}
          future={future}
          lastMove={lastMove}
          board={fen}
          user={user}
        />
      )}
    </div>
  );
};

export default Chess;
