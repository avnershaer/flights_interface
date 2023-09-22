import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";
import FlightDetails from "../../tableComps/FlightDetails";

const GetFlightsTable = ({ handleOrderClick }) => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get('/flights/')
      .then(result => {
        console.log("flights data:", result.data.Details); 
        setFlights(result.data.Details);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }
  
  return (
    <div className="cust-details">
      
      {/* check if error or one or multi obj*/}

      {error ? (
        <div className="error">{error}</div>
      ) : flights && Array.isArray(flights) ? (
        <FlightsTable flights={flights} handleOrderClick={handleOrderClick} />
      ) : flights && typeof flights.Details === 'object' ? (
        <FlightDetails apiResponse={flights} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default GetFlightsTable;