import React, { useState } from "react";
import { createFlight } from "../../AxiosPath";

function AddFlight() {
  const [formValues, setFormValues] = useState({
    departure_date: "",
    departure_time: "",
    landing_date: "",
    landing_time: "",
    remaining_tickets: "",
    origin_country_id: "",
    destination_country_id: "",
  });

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

    // Reset the form after successful submission
    setFormValues({
      departure_date: "",
      departure_time: "",
      landing_date: "",
      landing_time: "",
      remaining_tickets: "",
      origin_country_id: "",
      destination_country_id: "",
    });
  } catch (error) {
    console.error("Flight creation failed:", error.response.data.error);
    alert(error.response.data.error);
  }
};

  return (
    <div>
      <div>Please add flight details here, *all fields are required<br/><br/></div>
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
    </div>
  );
}

export default AddFlight;