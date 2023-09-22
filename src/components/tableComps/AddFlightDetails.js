import React, {useState} from "react";
import FacadeBaseButton from "../bouttunsComp/facadeBaseBottun";
import AddTicket from "../mainComps/customer/AddTicket";
import GetFlightsTable from "../mainComps/FacadBaceComps/GetFlightsTable";
import { Link } from "react-router-dom";

function AddFlightDetails({ apiResponse }) {
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [showFlightsTable, setShowFlightsTable] = useState(false);

  const nandleFlightsTableBottun = () => {
     setShowFlightsTable(true);
     document.location.reload();
    
  };
  
  const handleOrderButton = () => {
    setShowAddTicket(true);
    
  };


  return (
    <div className="details">
      
      {showFlightsTable ? (
        <div>
        <GetFlightsTable handleOrderClick={handleOrderButton} />
        </div>
      ) : (
        <>
          <p><Link to='GetAirLinesTable'><FacadeBaseButton value='add another flight' color='yellow'   onClick={() => nandleFlightsTableBottun()}/></Link></p>
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Flight details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="Flight-details-error"> {apiResponse.error} </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>

      ) : (
        <>
          
          <p>
            Flight ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.flight_id}
            </span>
          </p>
          <p>
            Airline Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.air_line_name?.air_line_name}
            </span>
          </p>
          <p>
            Company Logo:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.air_line_name?.company_logo}
            </span>
          </p>
          <p>
            from:
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.origin_country_flag?.country_name}
            </span>{" "}
            to:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.destination_country_flag?.country_name}
            </span>
          </p>
          <p>
            Departure Time:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.departure_time
                ? new Date(apiResponse.Details.departure_time).toLocaleDateString()
                : "*"}{" "}
              |
            </span>{" "}
            Landing Time:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.landing_time
                ? new Date(apiResponse.Details.landing_time).toLocaleTimeString()
                : "*"}
            </span>
          </p>
          <p>
            Remaining Tickets:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.remaining_tickects}
            </span>
          </p>
          {showAddTicket ? (
            <AddTicket flight_id={apiResponse?.Details?.flight_id} />
          ) : (
            <p>
              
            </p>
            
          )}
           
           </>
          )}
        </>
      )}
    </div>
  );
}

export default AddFlightDetails;