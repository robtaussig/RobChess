import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface PreMoveProps {
  className?: string;
  from: number;
  to: number;
  parentHeight: number;
  parentWidth: number;
  isBoardFlipped: boolean;
}

export const PreMove: FC<PreMoveProps> = ({
  className,
  from,
  to,
  parentHeight,
  parentWidth,
  isBoardFlipped,
}) => {
  let fromRow = Math.floor(from / 8);
  let toRow = Math.floor(to / 8);
  let fromCol = (from % 8);
  let toCol = (to % 8);
  if (isBoardFlipped) {
    fromRow = 7 - fromRow;
    toRow = 7 - toRow;
    fromCol = 7 - fromCol;
    toCol = 7 - toCol;
  }

  const halfVerticalUnit = parentHeight / 16;
  const halfHorizontalUnit = parentWidth / 16;

  return (
    <div className={cn(styles.root, className)}>
      <svg height={parentHeight} width={parentWidth}>
          <defs>
              <marker
                id={`markerArrow${from}${to}`}
                markerWidth={'12'}
                markerHeight={'12'}
                refX="10"
                refY="6"
                orient="auto"
              >
                  <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: 'white' }} />
              </marker>
          </defs>
          
          <line
            style={{ markerEnd: `url(#markerArrow${from}${to})` }}
            x1={(fromCol * (parentWidth / 8)) + halfHorizontalUnit}
            y1={(fromRow * (parentHeight / 8)) + halfVerticalUnit}
            x2={(toCol * (parentWidth / 8)) + halfHorizontalUnit}
            y2={(toRow * (parentHeight / 8)) + halfVerticalUnit}
          />
        </svg>
    </div>
  );
};

export default PreMove;
