import React from "react";

import Select from "react-select";

export const Selector = ({
  options,
  defaultValue,
  onChange,
  isMulti = false,
}) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "12px",
          borderColor: "rgba(27, 37, 75, 0.1)",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: "rgba(27, 37, 75, 0.1)",
        }),
        menuPortal: (base) => ({
          ...base,
          fontSize: "12px",
        }),
      }}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
    />
  );
};
