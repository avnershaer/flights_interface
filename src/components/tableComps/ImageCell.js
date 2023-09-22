import React from "react";

const ImageCell = (props) => {
  const baseUrl = "http://127.0.0.1:8000/";
  const fullPath = baseUrl+props; 
  console.log({fullPath});
  return <img src={fullPath} alt="Cell" />;
};

export default ImageCell;