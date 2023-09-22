import React, { useState } from "react";
import { createFlight } from "../../AxiosPath";
import AddFlightDetails from "../../tableComps/AddFlightDetails";

function AddFlight() {
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const [formValues, setFormValues] = useState({
    departure_date: "",
    departure_time: "",
    landing_date: "",
    landing_time: "",
    remaining_tickets: "",
    origin_country_id: "",
    destination_country_id: "",
  });
  const [isFlightCreated, setIsFlightCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Combine departure_date and departure_time into a datetime string
  const combinedDepartureDateTime = `${formValues.departure_date}T${formValues.departure_time}Z`;
  const combinedLandingDateTime = `${formValues.landing_date}T${formValues.landing_time}Z`;
  const origin_country_id = formValues.origin_country_id;
  const destination_country_id = formValues.destination_country_id;
  const remaining_tickets = formValues.remaining_tickets
  try {
    const flightData = {
    
      departure_time: combinedDepartureDateTime,
      landing_time: combinedLandingDateTime,
      destination_country_id: destination_country_id,
      origin_country_id: origin_country_id,
      remaining_tickets: remaining_tickets,

     
      
    };
    console.log("formValues", formValues);
    const response = await createFlight(flightData);
    console.log("Flight created:", response.data);
    setApiResponse(response.data)
    setIsFlightCreated(true);
    // reset form after successful submission
    setFormValues({
      departure_date: "",
      departure_time: "",
      landing_date: "",
      landing_time: "",
      remaining_tickets: "",
      origin_country_id: "",
      destination_country_id: "",
    });
  } catch (err) {
    console.error("Flight creation failed:", err);
    if (err.response && err.response.data) {
      console.log("Error response data:", err.response.data);
      setErrorMessage(err.response.data.details || "An unknown error occurred");
    } else {
      console.error("Network error or unknown error:", err);
      setErrorMessage("An unknown error occurred");
    }
    setError(err);
  }
};

if (errorMessage) {
  // if error, render error details
  return <div className="error">Error: {error.message}</div>;
}

  return (
    <div>
      {isFlightCreated ? (
      <div className="good_response_details">
        <h4>O.K <br/> Flight been crated.</h4>
        <AddFlightDetails apiResponse={apiResponse}/>
      </div>
       ) : (
      <div>
      <div className="add_flight_input">Please add flight details here, *all fields are required<br/><br/></div>
      <form onSubmit={handleSubmit}>
      
        <label className="input-label">
          Origin country ID:&nbsp;
          <input
            type="number"
            name="origin_country_id"
            value={formValues.origin_country_id}
            onChange={handleChange}
          />
        </label>

        <label className="input-label">
          Destination country ID:&nbsp;
          <input
            type="number"
            name="destination_country_id"
            value={formValues.destination_country_id}
            onChange={handleChange}
          />
        </label>
        <br/><br/>
        <label className="input-label">
          Departure date:&nbsp;
          <input
            type="date"
            name="departure_date"
            value={formValues.departure_date}
            onChange={handleChange}
          />
        </label>
        &nbsp;&nbsp;
        <label className="input-label">
          Departure time (HH:MM:SS):&nbsp;
          <input
            type="text"
            name="departure_time"
            value={formValues.departure_time}
            onChange={handleChange}
            placeholder="HH:MM:SS"
            pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
            title="Please enter a time in the format HH:MM:SS"
          />
        </label>
        <br/><br/>
        <label className="input-label">
          Landing date:&nbsp;
          <input
            type="date"
            name="landing_date"
            value={formValues.landing_date}
            onChange={handleChange}
          />
        </label>
        &nbsp;&nbsp;
        <label className="input-label">
          Landing time (HH:MM:SS):&nbsp;
          <input
            type="text"
            name="landing_time"
            value={formValues.landing_time}
            onChange={handleChange}
            placeholder="HH:MM:SS"
            pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
            title="Please enter a time in the format HH:MM:SS"
          />
        </label>
        <br/><br/>
        <label className="input-label">
          Remaining tickets:&nbsp;
          <input
            type="number"
            name="remaining_tickets"
            value={formValues.remaining_tickets}
            onChange={handleChange}
          />
        </label>
        <br/><br/>
        <button type="submit" className="register-button">
          Add Flight
        </button>
      </form>
      <br/>
        {errorMessage && (
        <div className="error">
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </div>
    )}
    </div>
  );
}

export default AddFlight;