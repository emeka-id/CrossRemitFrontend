import React, { FC, ReactChild } from 'react';
import styles from './card.module.scss';

type Props = {
  color?: 'primary-color' | 'primary-color-light';
  className?: string;
  variant?: 'outline' | 'block';
  children?: ReactChild | ReactChild[];
};

const Card: FC<Props> = ({ children, color, className, variant, ...props }) => {
  return (
    <div
      className={[styles.card, color, className].join(' ')}
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
