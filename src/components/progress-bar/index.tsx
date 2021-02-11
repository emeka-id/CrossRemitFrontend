
import React, { FC } from 'react';

type Props = {
  percentage?: Number;
};

const ProgressBar: FC<Props> = ({ percentage }) => {
  const bar = {
    height: 10,
    width: '100%',
    backgroundColor: getComputedStyle(
      document.documentElement
    ).getPropertyValue('--grey'),
    borderRadius: 50,
  };

  const fillBar = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: getComputedStyle(
      document.documentElement
    ).getPropertyValue('--primary-color'),
    borderRadius: 'inherit',
  };

  return (
    <div style={bar}>
      <div style={fillBar}></div>
    </div>
  );
};

export default ProgressBar;
