import React from "react";

function AirlineDetails({ apiResponse }) {
  return (
    <div className="details">
      
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Air Line details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="error"> {apiResponse.error} </div>
        </p>

      ) : (
        <>

          <p>
            Air Line ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.air_line_id}
            </span>
          </p>
          <p>
            Airline Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.air_line_name}
            </span>
          </p>
          <p>
            Company Logo:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.company_logo}
            </span>
          </p>
          <p>
            Country ID:
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.country_id}
            </span>
          </p>
          
          
        </>
      )}
    </div>
  );
}

export default AirlineDetails;