import React, { useState } from "react";
import TextCell from "./TextCell";
import { getFlightDetails } from "../AxiosPath";
import FlightDetails from "./FlightDetails";


const FlightsTable = ({ flights }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const hasError = flights && flights.error;


  




  const handleDetailsClick = async (flightId) => {
    try {
      const response = await getFlightDetails(flightId);
      console.log("api response:", response.data);
      setApiResponse(response.data);
      setSelectedFlight(flightId);
      setShowFlightDetails(true);
    } catch (error) {
      console.error("Error making API call:", error);
      console.log("Error response data:", error.response.data);
      setApiResponse({
        error: error.response.data.error,
        status: error.response.data.status,
      });
    }
  };

  if (hasError) {
    // render an error message if needed
    return (
      <div className="error">
        <p>{flights.error}</p>
      </div>
    );
  }

  return (
    <div className="table-container">
    
    

    
     
      {showFlightDetails ? (
        <FlightDetails apiResponse={apiResponse} />
      ) : (
        <div>
          <div textalign='center'>Flights details</div>
        <table>
          
          <thead>
            <tr>
              <th className="header-cell">Air Line</th>
              <th className="header-cell">From</th>
              <th className="header-cell">To</th>
              <th className="header-cell">Flight Id</th>
              <th className="header-cell">Departure Time</th>
              <th className="header-cell">Landing Time</th>
              <th className="header-cell">Remaining Tickets</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody align="center">
            {flights.map((flight, index) => (
              <tr key={index}>
                <TextCell text={flight.air_line_name.air_line_name} />
                <TextCell text={flight.origin_country_flag.country_name} />
                <TextCell text={flight.destination_country_flag.country_name} />
                <TextCell text={flight.flight_id} />
                <TextCell text={new Date(flight.departure_time).toLocaleDateString()} />
                <TextCell text={new Date(flight.landing_time).toLocaleDateString()} />
                <TextCell text={flight.remaining_tickects} />
                <td>
                  <button onClick={() => handleDetailsClick(flight.flight_id)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default FlightsTable;