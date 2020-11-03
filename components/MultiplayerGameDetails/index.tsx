import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import Board from '../Board';
import GameDetails from '../GameDetails';
import {
  boardSelector,
  PlayerState,
  Moment,
} from '../../redux/board';
import { userSelector, User } from '../../redux/user';
import {
  networkSelector,
  MAIN_ROOM,
} from '../../redux/network';
import OpponentFinder from '../OpponentFinder';
import ChallengedMessage from './subcomponents/ChallengedMessage';
import GameOver from './subcomponents/GameOver';
import { useMultiplayer } from '../../hooks/use-multiplayer';

export interface MultiplayerGameDetailsProps {
  styles: any;
  invitedBy: string;
  handleAcceptChallenge: () => void;
  handleRejectChallenge: () => void;
  room: string;
  opponentState: PlayerState;
  playerState: PlayerState;
  handlePlayAgain: () => void;
  handleGoBack: () => void;
  handleDraw: () => void;
  handleResign: () => void;
  whitePlayer: User;
  blackPlayer: User;
  history: Moment[];
  future: Moment[];
  lastMove: [number, number, string?];
  board: string;
  user: User;
  isPromoting: boolean;
  onPromote: (piece: string) => void;
  onCommitMoves?: () => void;
  onPeek?: () => void;
  peeksLeft?: number;
  canTimeTravel?: boolean;
}

export const MultiplayerGameDetails: FC<MultiplayerGameDetailsProps> = ({
  styles,
  invitedBy,
  handleAcceptChallenge,
  handleRejectChallenge,
  room,
  opponentState,
  playerState,
  handlePlayAgain,
  handleGoBack,
  handleDraw,
  handleResign,
  whitePlayer,
  blackPlayer,
  history,
  future,
  lastMove,
  board,
  user,
  onCommitMoves,
  onPeek,
  peeksLeft,
  isPromoting,
  onPromote,
  canTimeTravel = true,
}) => {

  return (
    <>
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
          board={board}
          user={user}
          onCommitMoves={onCommitMoves}
          onPeek={onPeek}
          peeksLeft={peeksLeft}
          canTimeTravel={canTimeTravel}
          isPromoting={isPromoting}
          onPromote={onPromote}
        />
      )}
    </>
  );
};

export default MultiplayerGameDetails;
