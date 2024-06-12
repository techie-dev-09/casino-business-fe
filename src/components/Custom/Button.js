import React from "react";
import { Button } from "reactstrap";
const Buttons = (props) => {
  const {
    type,
    children,
    classname,
    className,
    size,
    handleSubmit,
    color,
    onClick,
    disable,
    bgColor,
    width,
  } = props;
  return (
    <React.Fragment>
      <Button
        style={{ backgroundColor: bgColor, width }}
        type={type}
        name={classname}
        className={className}
        size={size}
        onSubmit={handleSubmit}
        onClick={onClick}
        color={color}
        disabled={disable}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};
export default Buttons;
