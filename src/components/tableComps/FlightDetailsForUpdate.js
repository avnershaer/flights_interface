import React, { useState, useEffect } from "react";
import { updateFlight } from "../AxiosPath";
import UpdatedFlightDetails from "./UpdatedFlightDetails";

function FlightDetailsForUpdate({ flightDetails, flight_id }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [formValues, setFormValues] = useState({
    departure_time: "",
    landing_time: "",
    remaining_tickets: "",
    origin_country_id: "",
    destination_country_id: "",
    origin_country: "",
    destination_country: "",
  });
  const [isFlightUpdated, setIsFlightUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // update formValues when airLineDetails prop changes (API response)
  useEffect(() => {
    if (flightDetails) {
      setFormValues({
        departure_time: flightDetails.departure_time || "",
        landing_time: flightDetails.landing_time || "",
        remaining_tickets: flightDetails.remaining_tickects || "",
        origin_country_id: flightDetails.origin_country_flag.country_id || "",
        destination_country_id: flightDetails.destination_country_flag.country_id || "",
        origin_country: flightDetails.origin_country_flag.country_name || "",
        destination_country: flightDetails.destination_country_flag.country_name || "",
      });
    }
  }, [flightDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const flightData = {
        ...formValues,
      };
      console.log("formValues", formValues);
      // parse flight_id to integer
      const parsedFlightId = parseInt(flight_id, 10);
      console.log("flight id:", parsedFlightId);
      const response = await updateFlight(parsedFlightId ,flightData);
      console.log("flight updated:", response.data);
      setApiResponse(response.data);
      setIsFlightUpdated(true);
      // reset the form after successful submission
      setFormValues({
        departure_time: "",
        landing_time: "",
        remaining_tickets: "",
        origin_country_id: "",
        destination_country_id: "",
        origin_country: "",
        destination_country: "",
      });
    } catch (error) {
      console.error("flight update failed:", error.response.data.error);
      setErrorMessage(error.response.data.details);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (errorMessage) {
    // if error, render error details
    return (
    <div className="error">
      Error: {errorMessage}<br/>
    <button onClick={handleRefresh}>Try again</button>
    </div>
    )
  }


  return (
    <div className="details">
      {isFlightUpdated ? (
        <div className="good_response_details">
          <h4>O.K, Flight has been updated.</h4>
          <UpdatedFlightDetails apiResponse={apiResponse} />
        </div>
      ) : (
        <div>
          {errorMessage && (
            <div className="error">
              <p>Error: {errorMessage}</p>
            </div>
          )}
          <h3>
            <span style={{ color: "yellow" }}>Flight new details:</span>
          </h3>
          <label className="input-label">
            Departure Time:<br />
            <input
              type="text"
              name="departure_time"
              value={new Date(formValues.departure_time).toLocaleDateString()}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Landing Time:<br/>
            <input
              type="text"
              name="landing_time"
              value={formValues.landing_time}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Remaining Tickets:<br/>
            <input
              type="number"
              name="remaining_tickets"
              value={formValues.remaining_tickets}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Origin Country Id:<br/>
            <input
              type="number"
              name="origin_country_id"
              value={formValues.origin_country_id}
              onChange={handleChange}
            />
          </label>
          <br/>
          <label className="input-label">
            Origin Country:<br/>
            <input
              type="text"
              name="origin_country"
              value={formValues.origin_country}
              onChange={handleChange}
              readOnly
            />
          </label>
          <br />
          <label className="input-label">
            Destination Country Id:<br/>
            <input
              type="number"
              name="destination_country_id"
              value={formValues.destination_country_id}
              onChange={handleChange}
            />
          </label>
          <br/>
          <label className="input-label">
            Destination Country:<br/>
            <input
              type="text"
              name="destination_country"
              value={formValues.destination_country}
              onChange={handleChange}
              readOnly
            />
          </label>
          <br />
          <br />
          <button type="submit" className="register-button" onClick={handleSubmit}>
            Update Flight
          </button>
        </div>
      )}
    </div>
  );
}

export default FlightDetailsForUpdate;