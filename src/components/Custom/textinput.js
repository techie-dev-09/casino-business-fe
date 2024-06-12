import React, { useState } from "react";
import { Input } from "reactstrap";
import "./input.scss";

function TextInput({
  type = "text",
  values,
  name,
  placeholder,
  errors,
  touched,
  handleChange,
  className,
  style,
  disabled = false,
  isIcon = true,
  defaultValue,
  checked,
  iconName,
  isPassword,
  min,
  max,
  step,
}) {
  const isError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <React.Fragment>
      <div className="has-wrapper mb-20">
        {isIcon && (
          <span className="has-icon">
            <i className={iconName}></i>
          </span>
        )}
        <Input
          value={values[name]}
          name={name}
          className={
            className ? className : `${isError ? "border-danger " : ""}`
          }
          step={step}
          placeholder={placeholder}
          autoComplete="off"
          style={style}
          onChange={handleChange}
          disabled={disabled}
          type={showPassword ? "text" : type}
          defaultValue={defaultValue}
          checked={checked}
          min={min}
          max={max}
        />
        {isError && (
          <div
            style={{ fontSize: 14, display: "flex", flexDirection: "column" }}
            className="text-left mt-1 text-danger"
          >
            {errors[name]}
          </div>
        )}
        {isPassword && showPassword && (
          <span className="has-icon" style={{ top: "4px" }}>
            <i
              className="ri-eye-fill"
              onClick={() => setShowPassword(false)}
            ></i>
          </span>
        )}
      </div>
    </React.Fragment>
  );
}

export default TextInput;
