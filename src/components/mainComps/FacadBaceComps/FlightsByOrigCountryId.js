import React, { useState, useEffect } from "react";
import { AxiosPath, FlightsDetailsByOrigCountryId } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";
import FilghtDetailsSingleArrey from "../../tableComps/FilghtDetailsSingleArrey";

function FlightsByOrigCountryId() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setselectedCountryId] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get("/countries/")
      .then((result) => {
        setCountries(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  const handleIdChange = (event) => {
    setselectedCountryId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedCountryId) {
      try {
        const response = await FlightsDetailsByOrigCountryId(selectedCountryId);
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
    setselectedCountryId(event.target.value);
  };

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }
  
  return (
    <div className="FlightByOrigCountryId-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET FLIGHTS DETAILS by ORIGIN COUNTRY ID</span>
        </div>  
        <br/>             
        Enter country id<br/>              
       
        <input type="number" placeholder="Country ID" value={selectedCountryId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get flights details</button>
      </div>
      
      *** if you don't know the country ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedCountryId}>
          <option value="">select country id</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              - id:{country.country_id} -- {country.country_name} 
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

export default FlightsByOrigCountryId;