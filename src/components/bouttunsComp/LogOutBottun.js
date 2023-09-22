import React, { useState } from "react";

function LogOutBottun(props) {
  const [color, setColor] = useState(" rgba(108, 31, 4, 0.944");
  const [borderColor, setBorderColor] = useState("yellow");
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

    // changung colors on mouse over
    changeColor("rgb(95, 58, 15)", "yellow", "yellow");
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
          width: "240px", 
          height: "30px", 
        }}
      >
        {props.value}
      </button>
    </div>
  );
}

export default LogOutBottun;