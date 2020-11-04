import Chess from 'chess.js';
import { openings } from './openings_db';

let boardMap = null;

const moveMap = [8, 7, 6, 5, 4, 3, 2, 1].reduce((acc, row, rowIdx) => {
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].forEach((col, colIdx) => {
    acc[`${col}${row}`] = Number(`${rowIdx + 1}${colIdx + 1}`);
  });
  return acc;
}, {});

const convertToFenPos = (pos: number): number => {
  const row = Math.floor(pos / 10) - 1;
  const col = pos % 10;
  return (row * 8) + col - 1;
};

export const toFenMove = (move: string): string => {
  return move.split('-').map(pos => convertToFenPos(Number(pos))).join('-');
};

const fromChessMove = chessMove => {
  const from = chessMove.split('-')[0];
  const to = chessMove.split('-')[1];
  return `${moveMap[from.toLowerCase()]}-${moveMap[to.toLowerCase()]}`;
};

const replaceCaptureWithHyphen = move => {
  return move.replace('x', '-');
};

const stripCapitalLetters = move => {
  return move.replace(/[A-Z]/g, '');
};

const stripCheck = move => {
  return move.replace('+', '');
};

const convertCastle = (move, idx) => {
  if (idx % 2) {
    if (move === '0-0') {
      return 'e8-g8';
    } else if (move === '0-0-0') {
      return 'e8-c8';
    }
  } else if (move === '0-0') {
    return 'e1-g1';
  }
  return move;
};

const convertMove = (move, idx) => {
  return toFenMove(fromChessMove(
    stripCheck(
      replaceCaptureWithHyphen(
        stripCapitalLetters(
          convertCastle(move, idx))))));
}

export const getBoardMap = () => {
  if (boardMap) {
    return boardMap;
  } else {
    boardMap = {};
    openings.forEach(opening => {
      const game = new Chess();
      opening.forEach(movePair => {    
        let [board, color] = game.fen().split(' ');
        board = `${board} ${color}`;
        movePair.split(' ').forEach((move, idx) => {
          game.move(move, { sloppy: true });
          let [newBoard, color] = game.fen().split(' ');
          boardMap[board] = boardMap[board] || [];
          const convertedMove = convertMove(move, idx);
          if (boardMap[board].includes(convertedMove) === false) {
            boardMap[board].push(convertedMove);
          }
          board = `${newBoard} ${color}`;
        });
      });
    });

    return boardMap;
  }
};
