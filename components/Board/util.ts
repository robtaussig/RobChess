export const getPosFromEvent = (
  event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  boardEl: HTMLDivElement,
): number => {
  const { clientX, clientY } = (event as any)?.touches?.[0] ?? event;
  return getPosFromCoords({ x: clientX, y: clientY }, boardEl);
};

export const getPosFromCoords = (
  coords: { x: number, y: number },
  boardEl: HTMLDivElement,
): number => {
  const boardX = coords.x - boardEl.offsetLeft;
  const boardY = coords.y - boardEl.offsetTop;
  const sideLength = boardEl.clientWidth;
  if (
    boardX > 0 &&
    boardY > 0 &&
    boardX <= sideLength &&
    boardY <= sideLength
  ) {
    const boardXPos = Math.floor((boardX / sideLength) * 8);
    const boardYPos = Math.floor((boardY / sideLength) * 8);
    return (boardYPos * 8) + boardXPos;
  } else {
    return null;
  }
};

export const flipIfBlack = (rows: string[], isBlack: boolean): string[] => {
  if (isBlack) return rows.slice().reverse().map(row => row.split('').reverse().join(''));

  return rows;
};

export const flipPosIfBoardFlipped = (pos: number, isBoardFlipped): number => {
  if (pos !== null && isBoardFlipped) {
    const row = 7 - Math.floor(pos / 8);
    const col = 7 - (pos % 8);
    return row * 8 + col;
  }
  return pos;
};
