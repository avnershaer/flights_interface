import React from "react";
import TextCell from "./TextCell";



const CountriesTable = ({countries}) => {
  // if error in flights prop
  const hasError = countries && countries.error;

  if (hasError) {
    // error message
    return <div>{countries.error}</div>;
  }
  
    return (
        <div className="table-container">
          <h3>Countries</h3>
          <table>
            <thead>
              <tr>
                <th className="header-cell">Country</th>
                <th className="header-cell">Flag</th>
              </tr>
            </thead>
            <tbody align="center">
              {countries.map((country, index) => (
                <tr key={index}>
                  <td><TextCell text={country.country_name}></TextCell></td>
                  <td><TextCell text={country.country_flag}></TextCell></td>
          
                  <td>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}






export default CountriesTable;