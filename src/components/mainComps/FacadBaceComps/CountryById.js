import React, { useState, useEffect } from "react";
import { AxiosPath, getCountryDetails } from "../../AxiosPath";
import CountryDetails from "../../tableComps/CountryDetails";

function CountryById() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedContryId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
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
    setSelectedContryId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedCountryId) {
      try {
        const response = await getCountryDetails(selectedCountryId);
        setApiResponse(response.data); // set appi response in state
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log the error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set api details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedContryId(event.target.value);
  };

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="ById-container">
      
      <div>
        <div>
          <span style={{ color: "white" }}>GET COUNTRY DETAILS by Country ID</span>
        </div>  
        <br/>             
        Enter country id<br/>              
       
        <input type="number" placeholder="Country ID" value={selectedCountryId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick}>Get country details</button>
      </div>
      
      *** if you don't know the Country ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedCountryId}>
          <option value="">select country</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              - id:{country.country_id} -  country: {country.country_name}
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div>
      
      <CountryDetails apiResponse={apiResponse} />
      
      </div>
    </div>
  );
}

export default CountryById;