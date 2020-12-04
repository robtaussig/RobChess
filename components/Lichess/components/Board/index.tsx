import React, { FC, useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Square from './Square';
import { PIECE_TO_CSS } from '../../../Board/subcomponents/Piece/constants';

export interface BoardProps {
    className?: string;
    board: string;
    lastMove: [number, number];
}

export const Board: FC<BoardProps> = ({
    className,
    board,
    lastMove,
}) => {
    const rootRef = useRef(null);
    const [width, setWidth] = useState(null);
    console.log(board);

    useEffect(() => {
        const adjustWidth = () => {
            setWidth(rootRef.current.clientWidth);
        }
        adjustWidth();
        window.addEventListener('resize', adjustWidth);

        return () => {
            window.removeEventListener('resize', adjustWidth);
        };
    }, []);

    return (
        <div
            className={cn(styles.root, className)}
            ref={rootRef}
            style={{
                height: width,
            }}
        >
            {board
                .split(' ')[0]
                .split('/')
                .reduce((acc, row, idx) => {
                    const squares = row.split('').reduce((next, unit) => {
                        if (!Number.isNaN(Number(unit))) {
                          next += new Array(Number(unit)).fill('-').join('');
                        } else {
                          next += unit;
                        }
                        return next;
                      }, '').split('');
                    
                    squares.forEach((square, squareIdx) => {
                        const pos = idx * 8 + squareIdx;
                        const isWhiteSquare = idx % 2 === squareIdx % 2;
                        const isWhitePiece = square !== '-' && square.toUpperCase() === square;
                        const isLastMoveFrom = lastMove?.[0] === pos;
                        const isLastMoveTo = lastMove?.[1] === pos;

                        acc.push((
                            <Square
                                key={`${square}-${idx}-${squareIdx}`}
                                className={cn(styles.square, {
                                    [styles.blackSquare]: !isWhiteSquare,
                                    [styles.blackPiece]: !isWhitePiece,
                                    [styles.whiteSquare]: isWhiteSquare,
                                    [styles.whitePiece]: isWhitePiece,
                                    [styles.lastMoveFrom]: isLastMoveFrom,
                                    [styles.lastMoveTo]: isLastMoveTo,
                                }, PIECE_TO_CSS[square])}
                                piece={square}
                                row={idx}
                                col={squareIdx}
                                boardLength={width}
                            />
                        ));
                    });
                
                    return acc;
                }, [])
            }
        </div>
    );
};

export default Board
