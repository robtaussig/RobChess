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
  const sideLength = (Math.min(window.innerWidth, window.innerHeight) / 25) * 24;
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
