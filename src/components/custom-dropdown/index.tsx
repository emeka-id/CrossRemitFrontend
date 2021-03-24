import React, { FC, useEffect, useState } from 'react';
import { Iselect } from 'types/inputs';
import './custom-dropdown.styles.scss';

const generateNameFromValue = (
  array: Array<Iselect>,
  value: string
): Array<Iselect> => {
  const result = array.filter((e) => value === e.value);
  return result;
};

type Props = {
  dropdownOption: Iselect[];
  placeHolderText: string;
  handleChange: Function;
  selectedOption?: string;
};

const CustomDropdown: FC<Props> = ({
  dropdownOption = [],
  placeHolderText = 'Select an option',
  handleChange,
  selectedOption = '',
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="custom-dropdown">
      <div
        className="custom-select-wrapper"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div className={`custom-select ${openDropdown ? 'open' : ''}`}>
          <div className="custom-select__trigger">
            <span>
              {generateNameFromValue(dropdownOption, selectedOption)[0]?.name ||
                placeHolderText}
            </span>
            <div className="arrow"></div>
          </div>
          <div className="custom-options">
            {dropdownOption.map((option: Iselect, index: number) => (
              <span
                key={option?.value}
                onClick={() => handleChange(option.value)}
                className={`custom-option ${
                  selectedOption.toLowerCase() === option.value.toLowerCase()
                    ? 'selected'
                    : ''
                }`}
              >
                {option.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
