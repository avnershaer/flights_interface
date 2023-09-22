import React from "react";
import { useEffect, useState } from "react";
import { AxiosPath } from "../../AxiosPath";
import FlightsTable from "../../tableComps/FlightsTable";
import FlightDetails from "../../tableComps/FlightDetails";

function GetMyFlights() {
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath
      .get("/get_my_flights/")
      .then(response => {
        console.log('api response:', response.data)
        setApiResponse(response.data.Details);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
  // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div >
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <div >
          {apiResponse.error}
        </div>
      ) : (
        <>
          <FlightsTable flights={apiResponse}/>
        </>
      )}
    </div>
  );
}


export default GetMyFlights;