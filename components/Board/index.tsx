import React, { FC, useRef } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import Row from './subcomponents/Row';
import { useDispatch, useSelector } from 'react-redux';
import { boardSelector, movingOver } from '../../redux/board';

export interface BoardProps {
  className?: string;
  validMoves: { [pos: number]: number[] };
  board: string;
}

export const Board: FC<BoardProps> = ({
  className,
  validMoves,
  board,
}) => {
  const dispatch = useDispatch();
  const { isMovingOver, isMovingFrom, lastMove } = useSelector(boardSelector);
  const rootRef = useRef<HTMLDivElement>(null);
  const squares = board.split(' ')[0];
  const rows = squares.split('/');

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];
    const boardX = clientX - rootRef.current.offsetLeft;
    const boardY = clientY - rootRef.current.offsetTop;
    const sideLength = (window.innerWidth / 25) * 24;
    const boardXPos = Math.floor((boardX / sideLength) * 8);
    const boardYPos = Math.floor((boardY / sideLength) * 8);
    const pos = (boardYPos * 8) + boardXPos;
    if (isMovingFrom !== null && pos !== isMovingOver) {
      dispatch(movingOver(pos));
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      onTouchMove={handleTouchMove}
    >
      {rows.map((row, idx) => {
        return (
          <Row
            key={`${idx}-row`}
            rowIdx={idx}
            row={row}
            isMovingFrom={isMovingFrom}
            isMovingOver={isMovingOver}
            validMoves={validMoves}
            lastMove={lastMove}
          />
        );
      })}
    </div>
  );
};

export default Board;
