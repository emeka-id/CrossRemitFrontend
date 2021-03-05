import React, { ReactChild, FC } from 'react';
import styles from './button.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactChild | ReactChild[];
  variant?: 'outline' | 'block';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({
  type,
  children,
  onClick,
  className,
  variant,
  disabled,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    data-variant={variant}
    className={[styles.btn, className].join(' ')}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
