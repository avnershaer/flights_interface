import React, { useState, useEffect } from "react";
import { AxiosPath, LandFlightsByCountryId } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";
import FilghtDetailsSingleArrey from "../../tableComps/FilghtDetailsSingleArrey";


function LandingFlightsByCountryId() {
  const [countries, setContries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get("/countries/")
      .then((result) => {
        setContries(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedCountryId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedCountryId) {
      try {
        const response = await LandFlightsByCountryId(selectedCountryId);
        setApiResponse(response.data.Details); 
        console.log("response data:", response.data);
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // Log the error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set the API error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedCountryId(event.target.value);
  };

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="ById-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET NEXT 12 HOURS ARRIVAL FLIGHTS DETAILS, by COUNTRY ID</span>
        </div>  
        <br/>             
        Enter Country id<br/>              
       
        <input type="number" placeholder="Country ID" value={selectedCountryId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get arrival flights details</button>
      </div>
      
      *** if you don't know the coutry ID number, select it from the list:
      
      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedCountryId}>
          <option value="">select country</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              - id:{country.country_id} -- {country.country_name} 
            </option>
          ))}
        </select>
        
        <br/>
      </div>
            {}
        <div>
          {apiResponse.error ? (
            <div className="error">{apiResponse.error}</div>
          ) : Array.isArray(apiResponse) ? (
            <FlightsTable flights={apiResponse} />
          ) : (
            <FilghtDetailsSingleArrey apiResponse={apiResponse} />
          )}
        </div>
    </div>
  );
}

export default LandingFlightsByCountryId;