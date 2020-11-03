import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { PIECE_TO_CSS } from '../../../Board/subcomponents/Piece/constants';

export interface PiecePromotionProps {
  className?: string;
  onPromote: (piece: string) => void;
  isBlack: boolean;
}

const pieces = ['q', 'r', 'b', 'n'];

export const PiecePromotion: FC<PiecePromotionProps> = ({
  className,
  onPromote,
  isBlack,
}) => {

  return (
    <div className={cn(styles.root, className)}>
      <h2 className={styles.header}>Promote to which piece:</h2>
      <div className={styles.pieces}>
        {pieces.map(piece => {
          return (
            <button
              key={`${piece}-promotion`}
              className={styles.button}
              onClick={() => onPromote(piece)}
            >
              <i
                  className={cn(styles.piece, PIECE_TO_CSS[piece], {
                      [styles.white]: !isBlack,
                      [styles.black]: isBlack,
                  })}
              />
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default PiecePromotion;
