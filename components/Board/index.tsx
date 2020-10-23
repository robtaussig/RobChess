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

  const handleMove = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = 'touches' in event ?
      event.touches[0] :
      event;
    const boardX = clientX - rootRef.current.offsetLeft;
    const boardY = clientY - rootRef.current.offsetTop;
    const sideLength = (Math.min(window.innerWidth, window.innerHeight) / 25) * 24;
    if (
      boardX > 0 &&
      boardY > 0 &&
      boardX <= sideLength &&
      boardY <= sideLength
    ) {
      const boardXPos = Math.floor((boardX / sideLength) * 8);
      const boardYPos = Math.floor((boardY / sideLength) * 8);
      const pos = (boardYPos * 8) + boardXPos;
      if (isMovingFrom !== null && pos !== isMovingOver) {
        dispatch(movingOver(pos));
      }
    } else {
      dispatch(movingOver(null));
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      onTouchMove={handleMove}
      onMouseMove={handleMove}
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
