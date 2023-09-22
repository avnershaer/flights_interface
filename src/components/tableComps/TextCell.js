import React from "react";



const TextCell = (props) => {
    const cellStyle = {
      fontSize: "11px",
      textAlign: props.isHeader ? 'center' : 'center', 
    };
  
    return (
      <td style={cellStyle}>{props.text}</td>
    );
  };
    
export default TextCell;