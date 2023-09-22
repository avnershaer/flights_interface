import React from "react";
import TextCell from "./TextCell";

const FlightsTable = ({ flights }) => {
  console.log("apiResponse:::", flights);
  const handleOrderClick = (flight) => {
    console.log("Order clicked for flight:", flight);
  };


 

  if (Array.isArray(flights) && flights.length > 0) {
    console.log("got flights ia an array", flights);
    return (
      <div>
        <h3>Flights Details</h3>
        <table border={0} align="center">
          <thead>
            <tr>
              <TextCell text={"air_line_name"} />
              <TextCell text={"origin_country_flag"} />
              <TextCell text={"destination_country_flag"} />
              <TextCell text={"flight_id"} />
              <TextCell text={"departure_time"} />
              <TextCell text={"landing_time"} />
              <TextCell text={"remaining_tickects"} />
              <th>Order</th>
            </tr>
          </thead>
          <tbody align="center">
            {flights.map((flight, index) => (
              <tr key={index}>
               
                  <TextCell text={flight.air_line_name.air_line_name}></TextCell>
             
            
                  <TextCell text={flight.origin_country_flag.country_name}></TextCell>
                
                  <TextCell text={flight.destination_country_flag.country_name}></TextCell>
               
                  <TextCell text={flight.flight_id}></TextCell>
                
                  <TextCell text={new Date(flight.departure_time).toLocaleDateString()}></TextCell>
                
                  <TextCell text={new Date(flight.landing_time).toLocaleDateString()}></TextCell>
                
                  <TextCell text={flight.remaining_tickects}></TextCell>
             
                <td>
                  <button onClick={() => handleOrderClick(flight)}>Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (flights) {
    console.log("got single flight", flights);
    // Render a single flight on a table
     // Assuming you have a single flight object
    return (
      <div>
        <h3>Flight Details</h3>
        <table border={0} align="center">
          <tbody align="center">
            <tr>
              <TextCell text={"air_line_name"} />
              <TextCell text={"origin_country_flag"} />
              <TextCell text={"destination_country_flag"} />
              <TextCell text={"flight_id"} />
              <TextCell text={"departure_time"} />
              <TextCell text={"landing_time"} />
              <TextCell text={"remaining_tickects"} />
            </tr>
            <tr>
              <td>
                <TextCell text={flights.Details.air_line_name.air_line_name}></TextCell>
              </td>
              <td>
                <TextCell text={flights.origin_country_flag.country_name}></TextCell>
              </td>
              <td>
                <TextCell text={flights.destination_country_flag.country_name}></TextCell>
              </td>
              <td>
                <TextCell text={flights.flight_id}></TextCell>
              </td>
              <td>
                <TextCell text={new Date(flights.departure_time).toLocaleDateString()}></TextCell>
              </td>
              <td>
                <TextCell text={new Date(flights.landing_time).toLocaleDateString()}></TextCell>
              </td>
              <td>
                <TextCell text={flights.remaining_tickects}></TextCell>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }else {
   
  console.log("got no flight", flights);
  return <div>No flight data available.</div>;
}
};



export default FlightsTable;