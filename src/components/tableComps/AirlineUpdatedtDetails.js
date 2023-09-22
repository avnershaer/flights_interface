import React from "react";

function AirlineUpdatedtDetails({ apiResponse }) {
  return (
    <div className="details">
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Air Line new details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="error"> {apiResponse.error} </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
      ) : (
        <>
          {apiResponse?.Details?.map((detail, index) => (
            <div key={index}>
              <p>
                Air Line ID:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.air_line_id}</span>
              </p>
              <p>
                Airline Name:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.air_line_name}</span>
              </p>
              <p>
                Company Logo:&nbsp;<span style={{ color: "white" }}>{"NULL"}</span>
                <span style={{ color: "white" }}>{detail.company_logo}</span>
              </p>
              <p>
                Country ID:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.country_id}</span>
              </p>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AirlineUpdatedtDetails;