import React, { useState } from "react";

function FacadeBaseButton(props) {
  const [color, setColor] = useState("black");
  const [borderColor, setBorderColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [originalColor, setOriginalColor] = useState("rgba(48, 255, 248, 0.944)");
  const [originalBorderColor, setOriginalBorderColor] = useState("white");
  const [originalTextColor, setOriginalTextColor] = useState("black");

  function changeColor(newColor, newBorderColor, newTextColor) {
    setColor(newColor);
    setBorderColor(newBorderColor);
    setTextColor(newTextColor);
  }

  function handleMouseOver() {
    setOriginalColor(color);
    setOriginalBorderColor(borderColor);
    setOriginalTextColor(textColor);

    // Change colors on mouse over
    changeColor("white", "black", "black");
  }

  function handleMouseOut() {
    changeColor(originalColor, originalBorderColor, originalTextColor);
  }

  function handleButtonClick() {
    console.log("Button clicked");
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <div>
      <button
        onClick={handleButtonClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          backgroundColor: color,
          border: `1px solid ${borderColor}`,
          color: textColor,
          width: props.width, 
          height: props.height,
          fontSize: props.fontSize
        }}
      >
        {props.value}
      </button>
    </div>
  );
}

export default FacadeBaseButton;