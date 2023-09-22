import React, { useState } from "react";
import FlightsTable from "../../tableComps/FlightsTable";
import { LandFlightsDetailsByDate } from "../../AxiosPath";
import FilghtDetailsSingleArrey from "../../tableComps/FilghtDetailsSingleArrey";

function FlightsByLandingDate() {
 
  const [selectedDate, setSelectedDate] = useState(""); // change state variable name
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null); // state variable for error message

  const handleDateChange = (event) => { // changed function name
    setSelectedDate(event.target.value); // set the selected date in state
  };

  const handleApiCallClick = async () => {
    if (selectedDate) { // check if a date is selected
      try {
        const response = await LandFlightsDetailsByDate(selectedDate); // use selected date for api call
        setApiResponse(response.data.Details);
        setError(null); // clear any previous errors
        console.log("response data:", response.data);
      } catch (error) {
        console.error("Error making API call:", error);
        if (error.response) {
          // server responded with an error 
          console.log("Error response data:", error.response.data);
          setError(error.response.data.error || "An unknown error occurred");
        } else if (error.request) {
          // request was made but no response received (possibly a network issue)
          console.log("Request made, but no response received.");
          setError("Network error. Please check your internet connection.");
        } else {
          // something else wrong
          setError("An unknown error occurred");
        }
        setApiResponse([]); // clear the response data
      }
    }
  };

  return (
    <div className="FlightByOrigCountryId-container">
      <div>
        <div>
          <span style={{ color: "white" }}>
            GET FLIGHTS DETAILS by LANDING DATE
          </span>
        </div>
        <br />
        <div style={{ color: "yellow" }}>Pick a flight date: </div><br/>
        
        <input
          type="date"
          placeholder="Select Date"
          value={selectedDate}
          onChange={handleDateChange} //  event handler
        />
      </div>
        
      <div className="send-id-bottun">
        <button onClick={handleApiCallClick}>Get flights details</button>
      </div>

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <br />
      </div>

    
      <div>
        {error ? (
          <div className="error">{error}</div> // display the error message
        ) : Array.isArray(apiResponse) ? (
          <FlightsTable flights={apiResponse} />
        ) : (
          <FilghtDetailsSingleArrey apiResponse={apiResponse} />
        )}
      </div>
    </div>
  );
}

export default FlightsByLandingDate;