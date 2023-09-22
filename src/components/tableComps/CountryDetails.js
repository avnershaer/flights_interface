import React from "react";

function CountryDetails({ apiResponse }) {
  return (
    <div className="details">
      
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Country details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="error"> {apiResponse.error} </div>
        </p>

      ) : (
        <>

          <p>
          COUNTRY ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.country_id}
            </span>
          </p>
          <p>
            COUNTRY:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.country_name}
            </span>
          </p>
          <p>
            FLAG:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.country_flag}
            </span>
          </p>
          
          
      
        </>
      )}
    </div>
  );
}

export default CountryDetails;