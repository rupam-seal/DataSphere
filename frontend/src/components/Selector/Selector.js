import React from "react";

import Select from "react-select";

export const Selector = ({ options, defaultValue, onChange }) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "12px",
          borderColor: "rgba(27, 37, 75, 0.1)",
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
    />
  );
};
