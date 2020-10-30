import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export interface PreMoveProps {
  className?: string;
  from: number;
  to: number;
  parentHeight: number;
  parentWidth: number;
}

export const PreMove: FC<PreMoveProps> = ({
  className,
  from,
  to,
  parentHeight,
  parentWidth,
}) => {

  console.log(from, to, parentHeight, parentWidth);

  return (
    <div className={cn(styles.root, className)}>

    </div>
  );
};

export default PreMove;
