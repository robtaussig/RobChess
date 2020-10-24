import React, { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { CapturedCountByPiece } from '../../types';
import { PIECE_TO_CSS } from '../../../../../Board/subcomponents/Piece/constants';

export interface PiecesProps {
    className?: string;
    white?: boolean;
    black?: boolean;
    pieces: CapturedCountByPiece;
}

export const Pieces: FC<PiecesProps> = ({
    className,
    pieces,
    white = false,
    black = false,
}) => {

    return (
        <div className={cn(styles.root, className)}>
            {Object.entries(pieces).reduce((next, [piece, count], idx) => {
                for (let i = 0; i < count; i++) {
                    next.push(
                        <i
                            key={`${idx}-${i}-${white ? 'white' : 'black'}-piece`}
                            className={cn(styles.piece, PIECE_TO_CSS[piece], {
                                [styles.white]: white,
                                [styles.black]: black,
                            })}
                        />
                    )
                }
                return next;
            }, [] as JSX.Element[])}
        </div>
    );
};

export default Pieces;
