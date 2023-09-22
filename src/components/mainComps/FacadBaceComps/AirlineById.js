import React, { useState, useEffect } from "react";
import { AxiosPath, getAirlineDetails } from "../../AxiosPath";
import AirlineDetails from "../../tableComps/AirlinetDetails";

function AirlineById() {
  const [airlines, setAirlines] = useState([]);
  const [selectedAirlineId, setSelectedAirlineId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
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
    setSelectedAirlineId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedAirlineId) {
      try {
        const response = await getAirlineDetails(selectedAirlineId);
        setApiResponse(response.data); // Set the API response in state
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedAirlineId(event.target.value);
  };

  if (error) {
  // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="AirlineById-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET AIR LINE DETAILS by AIR LINE ID</span>
        </div>  
        <br/>             
        Enter airline id<br/>              
       
        <input type="number" placeholder="Air Line ID" value={selectedAirlineId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get Air Line details</button>
      </div>
      
      *** if you don't know the Air Line ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedAirlineId}>
          <option value="">select air line</option>
          {airlines.map((airline) => (
            <option key={airline.air_line_id} value={airline.air_line_id}>
              - id:{airline.air_line_id} -  Air Line: {airline.air_line_name} 
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div>
      
      <AirlineDetails apiResponse={apiResponse} />
      
      </div>
    </div>
  );
}

export default AirlineById;