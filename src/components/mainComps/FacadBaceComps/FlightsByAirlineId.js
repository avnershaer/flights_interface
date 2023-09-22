import React, { useState, useEffect } from "react";
import { AxiosPath, FlightsDetailsByAirlineyId } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";
import FilghtDetailsSingleArrey from "../../tableComps/FilghtDetailsSingleArrey";

function FlightsByAirlineId() {
  const [airlines, setAirlines] = useState([]);
  const [selectedAirlineId, setselectedAirlineId] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get("/airlines/")
      .then((result) => {
        setAirlines(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  const handleIdChange = (event) => {
    setselectedAirlineId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedAirlineId) {
      try {
        const response = await FlightsDetailsByAirlineyId(selectedAirlineId);
        setApiResponse(response.data.Details); 
        console.log("response data:", response.data);
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log the error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setselectedAirlineId(event.target.value);
  };

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="FlightsbyAirlineId-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET FLIGHTS DETAILS by AIR LINE ID</span>
        </div>  
        <br/>             
        Enter airline id<br/>              
       
        <input type="number" placeholder="Air Line ID" value={selectedAirlineId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get flights details</button>
      </div>
      
      *** if you don't know the destination country ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedAirlineId}>
          <option value="">select airline id</option>
          {airlines.map((airline) => (
            <option key={airline.air_line_id} value={airline.air_line_id}>
              - id:{airline.air_line_id} -- {airline.air_line_name} 
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div>
      
      {Array.isArray(apiResponse) ? (
          <FlightsTable flights={apiResponse} />
          ) : apiResponse && typeof apiResponse === 'object' && !apiResponse.error ? (
            <FilghtDetailsSingleArrey apiResponse={apiResponse} />
          ) : apiResponse && apiResponse.error ? (
            <div className="error">{apiResponse.error}</div>
          ) : null}
      
      </div>
    </div>
  );
}

export default FlightsByAirlineId;