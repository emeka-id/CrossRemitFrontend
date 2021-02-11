import { Card } from 'components';
import React, { FC } from 'react';
import styles from './custom-input.module.scss';

type Props = {
  label: string;
  disable?: boolean;
};

const CustomInput: FC<Props> = ({ label, disable=false, ...props }) => {
  return (
    <Card variant={disable ? 'block' : 'outline'} className={disable ? "p-15 grey": 'p-15'}>
      <label>{label}</label>
      <div className={styles.suffix}>
        <span className="text-border-color">NGN</span>
        <input readOnly={disable} {...props}/>
      </div>
    </Card>
  );
};

export default CustomInput;
