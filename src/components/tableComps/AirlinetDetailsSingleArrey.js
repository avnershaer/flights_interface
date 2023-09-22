import React from "react";

function AirlinetDetailsSingleArrey({ apiResponse }) {
  console.log('api response',apiResponse)
  return (
    <div className="details">
       <span style={{ color: "white" }}>Got one Air Line:</span>
          <p>
            Air Line ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.air_line_id}
            </span>
          </p>
          <p>
            Airline Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.air_line_name}
            </span>
          </p>
          <p>
            Company Logo:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.company_logo}
            </span>
          </p>
          <p>
            Country ID:
            <span style={{ color: "white" }}>
              {apiResponse?.country_id}
            </span>
          </p>
          
          
       
      
    </div>
  );
}

export default AirlinetDetailsSingleArrey;