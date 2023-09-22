import React, { useState, useEffect } from "react";
import { AxiosPath, getFlightDetails } from "../AxiosPath";

import FlightByIdContainer from "./FlightByIdContainer";
import FlightDetails from "../tableComps/FlightDetails";

function FlightByIdcopy({customIdField}) {
  const [flights, setFlights] = useState([]);
  const [selectedCustomIdField, setselectedCustomIdField] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    AxiosPath.get("/flights/")
      .then((result) => {
        setFlights(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFlightIdChange = (event) => {
    setselectedCustomIdField(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedCustomIdField) {
      try {
        const response = await getFlightDetails(selectedCustomIdField);
        setApiResponse(response.data);
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data);
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); 
      }
    }
  };

  const handleDropdownChange = (event) => {
    setselectedCustomIdField(event.target.value);
  };

  return (
    <div>
      <FlightByIdContainer
        selectedFlightId={selectedCustomIdField}
        handleFlightIdChange={handleFlightIdChange}
        handleApiCallClick={handleApiCallClick}
        handleDropdownChange={handleDropdownChange}
        flights={flights}
        apiResponse={apiResponse}
        customIdField={customIdField}
        
      />

      <div>
      <FlightDetails apiResponse={apiResponse} />
      {/*<FlightsTable flights={flights} />*/}
    </div>
    </div>
  );
}


export default FlightByIdcopy;