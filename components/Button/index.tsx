import React, { FC } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
import cn from 'classnames';

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  link?: string;
  [rest: string]: any;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  className,
  link,
  children,
  ...rest
}) => {

  if (link) {
    return (
      <Link href={link}>
        <button
          className={cn(styles.root, className)}
          {...rest}
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
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
