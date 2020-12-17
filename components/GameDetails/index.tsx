import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import GameActions from './subcomponents/GameActions';
import CapturedPieces from './subcomponents/CapturedPieces';
import MoveHistory from './subcomponents/MoveHistory';
import PlayerDetails from './subcomponents/PlayerDetails';
import { User } from '../../redux/user'; 
import { Moment } from '../../redux/board'; 
import { currentTurn } from '../../redux/util'; 
import PiecePromotion from './subcomponents/PiecePromotion';

export interface GameDetailsProps {
  className?: string;
  onResign: () => void;
  onDraw: () => void;
  whitePlayer: User;
  blackPlayer: User;
  user: User;
  history: Moment[];
  future: Moment[];
  lastMove: [number, number, string?];
  board: string;
  isPromoting: boolean;
  onCommitMoves?: () => void;
  onPeek?: () => void;
  peeksLeft?: number;
  canTimeTravel?: boolean;
  onPromote: (piece: string) => void;
}

export const GameDetails: FC<GameDetailsProps> = ({
  className,
  onResign,
  onDraw,
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
    <div className={cn(styles.root, className)}>
      <PlayerDetails
        className={styles.playerDetails}
        whitePlayer={whitePlayer}
        blackPlayer={blackPlayer}
        history={history}
        user={user}
      />
      <GameActions
        className={styles.gameActions}
        onResign={onResign}
        onDraw={onDraw}
        onCommitMoves={onCommitMoves}
        onPeek={onPeek}
        peeksLeft={peeksLeft}
      />
      <CapturedPieces
        className={styles.capturedPieces}
        board={board}  
      />
      {isPromoting ? (
        <PiecePromotion
          className={styles.piecePromotion}
          onPromote={onPromote}
          isBlack={currentTurn(board) === 'black'}
        />
      ) : (
        <MoveHistory
          className={styles.moveHistory}
          history={history}
          future={future}
          lastMove={lastMove}
          canTimeTravel={canTimeTravel}
        />
      )}
    </div>
  );
};

export default GameDetails;
