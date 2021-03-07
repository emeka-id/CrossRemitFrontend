import { Button } from 'components';
import React, { DetailedHTMLProps, FC, InputHTMLAttributes, useRef } from 'react';

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ""> {
  label: string;
  variant?: 'outline' | 'block' | 'stripped';
};

const CustomUpload: FC<Props> = ({
  label,
  variant = 'outline',
  ...rest
}) => {
  const inputFile = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input {...rest} ref={inputFile} hidden />
      <Button
        type="button"
        variant={variant}
        onClick={() => inputFile?.current?.click()}
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomUpload;
