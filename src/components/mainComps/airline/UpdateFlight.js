import React, { useState, useEffect } from "react";
import { AxiosPath, getFlightDetails } from "../../AxiosPath";
import FlightDetailsForUpdate from "../../tableComps/FlightDetailsForUpdate";

function UpdateFlight() {
  const [flights, setFlights] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get("/get_my_flights/")
      .then((result) => {
        setFlights(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedFlightId(event.target.value);
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handleApiCallClick = async () => {
    if (selectedFlightId) {
      try {
        console.log('selected flight id', selectedFlightId)
        const response = await getFlightDetails(selectedFlightId);
        setApiResponse(response.data); // set the API response in state
      } catch (error) {
        console.error('API Error:', error);
        setError({ // ** general way for error handling
          error: "An error occurred while fetching data",
          status: "Error",
        });
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedFlightId(event.target.value);
  };

  if (error) {
    // if error, render error details and a refresh button
    return (
      <div className="error">
        <p>Error: {error}</p>
        <p>Status: {error.status}</p>
        <button onClick={handleRefresh}>Try again</button>
      </div>
    );
  }

  return (
    <div className="AirlineById-container">
      <div>
        <div>
          <h2><span style={{ color: "yellow" }}>Update Flight</span></h2>
        </div>
        <br/>
        Please enter flight id for updating:<br/>
        <input type="number" placeholder="Flight ID" value={selectedFlightId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun">
        <button onClick={handleApiCallClick}>Get Flight details</button>
      </div>

      *** if you don't know the flight ID number, select it from the list:

      <div className="input-container" style={{ marginBottom: "5px" }}>
        <select onChange={handleDropdownChange} value={selectedFlightId}>
          <option value="">Select flight</option>
          {flights.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              - id:{flight.flight_id} -  Flight from : {flight.origin_country_id}  to:{flight.destination_country_id}
            </option>
          ))}
        </select>
        <br/>
      </div>

      <div>
        {console.log('API response:', apiResponse)}
        <div>
          {apiResponse && apiResponse.Details ? (
            <FlightDetailsForUpdate flightDetails={apiResponse.Details} flight_id={selectedFlightId} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateFlight;