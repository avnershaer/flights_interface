import React, { useState, useEffect } from "react";
import { AxiosPath, getFlightDetails } from "../../AxiosPath";
import FlightDetails from "../../tableComps/FlightDetails";

function FlightById() {
  const [flights, setFlights] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    AxiosPath.get("/flights/")
      .then((result) => {
        setFlights(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedFlightId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedFlightId) {
      try {
        const response = await getFlightDetails(selectedFlightId);
        setApiResponse(response.data); // set api response in state
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log the error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedFlightId(event.target.value);
  };

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }
  return (
    <div className="FlightById-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET FLIGHT DETAILS by FLIGHT ID</span>
        </div>  
        <br/>             
        Enter flight id<br/>              
       
        <input type="number" placeholder="Flight ID" value={selectedFlightId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get flight details</button>
      </div>
      
      *** if you don't know the flight ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedFlightId}>
          <option value="">select flight</option>
          {flights.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              - id:{flight.flight_id} -  FROM: {flight.origin_country_flag.country_name} ... TO: {flight.destination_country_flag.country_name}...at: {flight.departure_time ? new Date(flight.departure_time).toLocaleDateString():''}
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div>
      
      <FlightDetails apiResponse={apiResponse} />
      
      </div>
    </div>
  );
}

export default FlightById;