import React from "react";

function TicketDetails({ apiResponse }) {
  console.log('the apiResponse ', apiResponse)
  return (
    <div style={{ backgroundColor: "black" }}>
      
      <h3>
        <span style={{ color: "rgb(19, 243, 255)" }}>
          {apiResponse && apiResponse.error ? "" : "Your ticket details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="airline-details-error"> {apiResponse.error} </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>

      ) : (
        <>
        <div className="ticket-detailsa">
          <p>
            ticket ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.ticket_id}
            </span>
          </p>
          <p>
            Surr Name:{" "}
            &nbsp;
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.customer?.cust_first_name}
            </span>
            &nbsp;
            &nbsp;
            last Name:{" "}
            &nbsp;
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.customer?.cust_last_name}
            </span>
          </p>
          <p>
            Flight ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.flight?.flight_id}
            </span>
            &nbsp;
            &nbsp;
            Air Line:
            &nbsp;
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.flight?.air_line_name?.air_line_name}
            </span>
          </p>
          <p>
            From:
            &nbsp; 
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.flight?.origin_country_flag?.country_name}
            </span>
            &nbsp;
            &nbsp;
            To:
            &nbsp;
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.flight?.destination_country_flag?.country_name}
            </span>
          </p>
          <p>
            Departure Date:
            &nbsp;
            <span style={{ color: "white" }}>
              {new Date(apiResponse?.Details?.flight?.departure_time).toLocaleDateString() || "N/A"}
            </span>
            &nbsp;
            &nbsp;
            Time:
            &nbsp;
            <span style={{ color: "white" }}>
              {new Date(apiResponse?.Details?.flight?.departure_time).toLocaleTimeString() || "N/A"}
            </span>
          </p>
          <p>
            Landing Date:
            &nbsp;
            <span style={{ color: "white" }}>
              {new Date(apiResponse?.Details?.flight?.landing_time).toLocaleDateString() || "N/A"}
            </span>
            &nbsp;
            &nbsp;
            Time:
            &nbsp;
            <span style={{ color: "white" }}>
              {new Date(apiResponse?.Details?.flight?.landing_time).toLocaleTimeString() || "N/A"}
            </span>
          </p>
          </div>
          
        </>
      )}
    </div>
  );
}

export default TicketDetails;