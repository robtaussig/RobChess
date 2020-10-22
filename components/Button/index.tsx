import React, { FC } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
import cn from 'classnames';

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  link?: string;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  className,
  link,
  children,
}) => {

  if (link) {
    return (
      <Link href={link}>
        <button
          className={cn(styles.root, className)}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={cn(styles.root, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
