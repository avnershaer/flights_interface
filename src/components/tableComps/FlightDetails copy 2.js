import React from "react";

function FlightDetails({ apiResponse }) {
  return (
    <div className="Flight-details">
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Flight details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p className="Flight-details-error">{apiResponse.error}</p>
      ) : (
        <table className="Flight-details-table">
          <thead style={{ font: "yellow" }}>
            <tr>
              <th>Flight ID</th>
              <th>Airline Name</th>
              <th>Company Logo</th>
              <th>From</th>
              <th>To</th>
              <th>Departure Time</th>
              <th>Landing Time</th>
              <th>Remaining Tickets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "white" }}>{apiResponse?.Details?.flight_id}</td>
              <td style={{ color: "white" }}>{apiResponse?.Details?.air_line_name?.air_line_name}</td>
              <td style={{ color: "white" }}>{apiResponse?.Details?.air_line_name?.company_logo}</td>
              <td style={{ color: "white" }}>{apiResponse?.Details?.origin_country_flag?.country_name}</td>
              <td style={{ color: "white" }}>{apiResponse?.Details?.destination_country_flag?.country_name}</td>
              <td style={{ color: "white" }}>
                {apiResponse?.Details?.departure_time
                  ? new Date(apiResponse.Details.departure_time).toLocaleDateString()
                  : "*"}
              </td>
              <td style={{ color: "white" }}>
                {apiResponse?.Details?.landing_time
                  ? new Date(apiResponse.Details.landing_time).toLocaleTimeString()
                  : "*"}
              </td>
              <td style={{ color: "white" }}>{apiResponse?.Details?.remaining_tickects}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FlightDetails;