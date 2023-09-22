import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";

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

  return <FlightsTable flights={flights} handleOrderClick={handleOrderClick} />;
};
 
export default GetFlightsTable;