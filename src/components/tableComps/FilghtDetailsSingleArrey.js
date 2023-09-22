import React from "react";

function FilghtDetailsSingleArrey({ apiResponse }) {
  console.log('api response',apiResponse)
  return (
    <div className="details">
  
          <p><h3><span style={{ color: " rgb(173, 254, 255)" }}>Got one flight: </span></h3>
            Flight ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.flight_id}
            </span>
          </p>
          <p>
            Airline Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.air_line_name?.air_line_name}
            </span>
          </p>
          <p>
            Company Logo:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.air_line_name?.company_logo}
            </span>
          </p>
          <p>
            from:
            <span style={{ color: "white" }}>
              {apiResponse?.origin_country_flag?.country_name}
            </span>{" "}
            to:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.destination_country_flag?.country_name}
            </span>
          </p>
          <p>
            Departure Time:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.departure_time
                ? new Date(apiResponse.departure_time).toLocaleDateString()
                : "*"}{" "}
              |
            </span>{" "}
            Landing Time:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.landing_time
                ? new Date(apiResponse.landing_time).toLocaleTimeString()
                : "*"}
            </span>
          </p>
          <p>
            Remaining Tickets:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.remaining_tickects}
            </span>
          </p>
          
          
       {/* </>*/}
      
    </div>
  );
}

export default FilghtDetailsSingleArrey;