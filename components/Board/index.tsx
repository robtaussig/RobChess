import React, { FC, useRef } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Row from './subcomponents/Row';
import { useDispatch, useSelector } from 'react-redux';
import { movingOver, boardSelector, premove, clearPremoves } from '../../redux/board';
import { userSelector } from '../../redux/user';
import { getPosFromEvent, getPosFromCoords } from './util';
import PreMoveOverlay from './subcomponents/PreMoveOverlay';

export interface BoardProps {
  className?: string;
  moveTo: (pos?: number) => void;
  isLive?: boolean;
}

export const Board: FC<BoardProps> = ({
  className,
  moveTo,
  isLive = false,
}) => {
  const lastClick = useRef<number>(null);
  const {
    validMoves,
    fen: board,
    isMovingOver,
    isMovingFrom,
    lastMove,
    whitePlayer,
    blackPlayer,
    future,
    premoves,
  } = useSelector(boardSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const rootRef = useRef<HTMLDivElement>(null);
 
  const handleMove = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const pos = getPosFromEvent(event, rootRef.current);
    if (pos !== null) {
      if (isMovingFrom !== null && pos !== isMovingOver) {
        dispatch(movingOver(pos));
      }
    } else {
      dispatch(movingOver(null));
    }
  };

  const handlePremove = (
    pos: number,
    coords: { x: number, y: number },
  ) => {
    const toPos = getPosFromCoords(coords, rootRef.current);
    if (pos !== toPos) {
      dispatch(premove({ from: pos, to: toPos }));
    }
  };

  const handleClickBoard = () => {
    const newTime = +new Date();
    if (newTime - lastClick.current < 250) {
      dispatch(clearPremoves());
      lastClick.current = null;
    } else {
      lastClick.current = newTime;
    }
  };

  if (!board) return null;

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      onTouchMove={handleMove}
      onMouseMove={handleMove}
      onClick={handleClickBoard}
    >
      {board
        .split(' ')[0]
        .split('/')
        .map((row, idx) => {
          return (
            <Row
              key={`${idx}-row`}
              rowIdx={idx}
              row={row}
              isMovingFrom={isMovingFrom}
              isMovingOver={isMovingOver}
              validMoves={validMoves}
              lastMove={lastMove}
              user={user}
              whitePlayer={whitePlayer}
              blackPlayer={blackPlayer}
              moveTo={moveTo}
              isLive={isLive}
              future={future}
              onPremove={handlePremove}
            />
          );
      })}
      <PreMoveOverlay
        className={styles.premoves}
        premoves={premoves}
      />
    </div>
  );
};

export default Board;
