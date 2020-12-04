import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

export interface SquareProps {
    className?: string;
    piece: string;
    row: number;
    col: number;
    boardLength: number;
}

export const Square: FC<SquareProps> = ({
    className,
    piece,
    row,
    col,
    boardLength,
}) => {

    return (
        <span
            className={className}
            style={{
                fontSize: Math.floor(boardLength / 10)
            }}    
        />
    );
};

export default Square
