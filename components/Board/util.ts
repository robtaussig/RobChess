export const getPosFromEvent = (
  event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  boardEl: HTMLDivElement,
): number => {
  const { clientX, clientY } = 'touches' in event ?
    event.touches[0] :
    event;
  const boardX = clientX - boardEl.offsetLeft;
  const boardY = clientY - boardEl.offsetTop;
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
