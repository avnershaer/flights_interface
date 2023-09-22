import React from "react";
import TextCell from "./TextCell";


const AirlinesTable = ({airlines}) => {
  console.log("apiResponse:", airlines);
  // check if error in airlines prop
  const hasError = airlines && airlines.error;

  if (hasError) {
    // error message
    return <div>{airlines.error}</div>;
  }
  
  // check error in api response
  if (airlines.error) {
    return (
      <div className="error">
      
       
        <p>{airlines.error}</p>
      </div>
    );
  }


  return (
    <div className="airline_table-container" >
      <h3>Air Line Companies list</h3>
      <table>
        <thead>
        <tr>
          <th className="header-cell">Air Line Id</th>
          <th className="header-cell">Air Line</th>
          <th className="header-cell">Contry</th>
          <th className="header-cell">User Id</th>
          <th className="header-cell">Logo</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {airlines.map((airLine, index) => (
            <tr key={index}>
              <TextCell text={airLine.air_line_id}></TextCell>
              <TextCell text={airLine.air_line_name}></TextCell>
              <TextCell text={airLine['country_id']}></TextCell>
              <TextCell text={airLine['user_id']}></TextCell>
              <TextCell text={airLine['company_logo']}></TextCell>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default AirlinesTable;