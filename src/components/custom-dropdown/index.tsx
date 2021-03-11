import React, { FC, useState } from "react";
import { Iselect } from "types/inputs";
import "./custom-dropdown.styles.scss";

type Props = {
  dropdownOption: Iselect[];
  placeHolderText: string;
  handleChange: Function;
  selectedOption: string;
};

const CustomDropdown: FC<Props> = ({
  dropdownOption,
  placeHolderText = "Select an option",
  handleChange,
  selectedOption,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="custom-dropdown">
      <div
        className="custom-select-wrapper"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div className={`custom-select ${openDropdown ? "open" : ""}`}>
          <div className="custom-select__trigger">
            <span>{selectedOption || placeHolderText}</span>
            <div className="arrow"></div>
          </div>
          <div className="custom-options">
            {dropdownOption?.map((option: Iselect, index: number) => (
              <span
                key={option?.value}
                onClick={() => handleChange(option.value)}
                className={`custom-option ${
                  selectedOption.toLowerCase() === option.value.toLowerCase()
                    ? "selected"
                    : ""
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
