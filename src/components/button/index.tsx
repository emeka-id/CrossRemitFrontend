import React, { ReactChild, FC } from 'react';
import styles from './button.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactChild | ReactChild[];
  variant?: 'outline' | 'block';
  className?: string;
  onClick?: () => void;
};

const Button: FC<Props> = ({ type, children, onClick, className, variant, ...props }) => (
  <button
    type={type}
    onClick={onClick}
    data-variant={variant}
    className={[styles.btn, className].join(' ')}
    {...props}
  >
    {children}
  </button>
);

export default Button;
