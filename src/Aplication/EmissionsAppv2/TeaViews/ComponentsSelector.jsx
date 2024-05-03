import React, { useEffect, useState } from "react";

const allComponents = {
  C1: 85.4305,
  C2: 8.5901,
  C3: 2.7031,
  'I-C4': 0.1882,
  C4: 0.2777,
  'N-C5': 0,
  'I-C5': 0.0359,
  C5: 0.0207,
  C6: 0.0263,
  C7: 0.0048,
  C8: 0.0014,
  C9: 0.0016,
  C10: 0,
  CO2: 0.08757,
  N2: 2.1649,
  H2O: 0,
};

export const ComponentSelector = ({ optionValues, onSelect, setOptionValues, teaValues }) => {

  const [selectedOptions, setSelectedOptions] = useState(Object.keys(allComponents));

  useEffect(() => {
    if (teaValues?.composition?.length === 0)
      setOptionValues(allComponents)
    else
      setOptionValues(teaValues?.composition ?? [])

  }, [teaValues]);

  useEffect(() => {
    if (optionValues.length === 0)
      setOptionValues(allComponents)
  }, []);

  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;
    setOptionValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        paddingRight: "1rem",
        width: "Auto",
        overflowY: "Auto",
        height: "52%",
      }}
    >
      {Object.keys(allComponents).map((option) => (
        <div
          key={option}
          style={{
            width: "100%",
            alignContent: "start",
            alignItems: "center",
            marginBottom: "0.1rem",
            justifyContent: "space-around",
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <span style={{ width: "4rem", textAlign: "end" }}>{option}</span>
          <div>
            <input
              type="text"
              name={option}
              style={{
                width: "4rem",
                paddingLeft: "0.4rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: "1px dotted rgb(0, 0, 0, 0.5)",
                textAlign: "end",
              }}
              value={optionValues[option]}
              placeholder={allComponents[option]}
              onChange={handleChange}
            />
            %
          </div>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => toggleOption(option)}
            style={{ width: "2rem" }}
          />
        </div>
      ))}
    </div>
  );
};
