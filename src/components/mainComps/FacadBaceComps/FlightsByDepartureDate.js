import React, { useState } from "react";
import FlightsTable from "../../tableComps/FlightsTable";
import { DepartFlightsDetailsByDate } from "../../AxiosPath";
import FilghtDetailsSingleArrey from "../../tableComps/FilghtDetailsSingleArrey";

function FlightsByDepartureDate() {
  const [selectedDate, setSelectedDate] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null); // state or error message

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedDate) {
      try {
        const response = await DepartFlightsDetailsByDate(selectedDate);
        setApiResponse(response.data.Details);
        setError(null); // clear previous errors
        console.log("response data:", response.data);
      } catch (error) {
        console.error("Error making API call:", error);
        if (error.response) {
          // server responded with an error  (400 or 500)
          console.log("Error response data:", error.response.data);
          setError(error.response.data.error || "An unknown error occurred");
        } else if (error.request) {
          console.log("Request made, but no response received.");
          setError("Network error. Please check your internet connection.");
        } else {
          // something else went wrong
          setError("An unknown error occurred");
        }
        setApiResponse([]); // clear response data
      }
    }
  };

  return (
    <div className="FlightByOrigCountryId-container">
      <div>
        <div>
          <span style={{ color: "white" }}>
            GET FLIGHTS DETAILS by DEPARTURE DATE<br /><br />
          </span>
        </div>
        <div style={{ color: "yellow" }}>Pick a flight date: </div><br />
        <input
          type="date"
          placeholder="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
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
          <div className="error">{error}</div> // Display the error message
        ) : Array.isArray(apiResponse) ? (
          <FlightsTable flights={apiResponse} />
        ) : (
          <FilghtDetailsSingleArrey apiResponse={apiResponse} />
        )}
      </div>
    </div>
  );
}

export default FlightsByDepartureDate;