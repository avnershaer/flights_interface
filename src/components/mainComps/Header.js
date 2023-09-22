import React from "react";
import airplain1 from "../images/airplain1.jpg";

function Header() {
  const headerStyle = {
    position: "relative",
    width: "100%",
    height: "120px", 
    overflow: "hidden", 
    
};


  const imageStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0%", 
    left: "50%",
    transform: "translateX(-50%)",
  };

  const textStyle = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
  };

  return (
    <div style={headerStyle}>
      <img src={airplain1} alt="airplain1" style={imageStyle} />
      <div style={textStyle}>
        <h1>
          welcome to <span style={{ color: "rgb(21, 219, 11)" }}>(demo)</span> flight tickets
          order system
        </h1>
      </div>
    </div>
  );
}

export default Header;