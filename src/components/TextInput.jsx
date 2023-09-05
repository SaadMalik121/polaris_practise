import { TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";

const TextInput = ({ initial_value, placeholder, label, type = "" }) => {
  const [value, setValue] = useState(initial_value);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      type={type}
    />
  );
};

export default TextInput;
