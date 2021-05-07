import { Card } from 'components';
import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './custom-input.module.scss';

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ''
  > {
  label?: string;
  disable?: boolean;
  name_of_input?: string;
}

const CustomInput: FC<Props> = ({
  label,
  disable = false,
  name_of_input,
  ...props
}) => {
  return (
    <Card
      variant={disable ? 'block' : 'outline'}
      className={disable ? 'p-15 grey' : 'p-15'}
    >
      <label>{label}</label>
      <div className={styles.suffix}>
        <span className={styles.placeholder_text}>{name_of_input}</span>
        <input readOnly={disable} {...props} />
      </div>
    </Card>
  );
};

export default CustomInput;
