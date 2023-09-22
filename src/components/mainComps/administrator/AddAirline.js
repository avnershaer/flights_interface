import React, { useState } from "react";
import { createAirline } from "../../AxiosPath";
import AirlineDetails from "../../tableComps/AirlinetDetails";

function AddAirline() {
  const [apiResponse, setApiResponse] = useState(null);
  const [formValues, setFormValues] = useState({
    user_name: "",
    password: "",
    email: "",
    air_line_name: "",
    country_id_id: "",
  });
  const [isAirlineCreated, setIsAirlineCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);

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
      const airlineData = {
        ...formValues,
      };
      console.log("formValues", formValues);
      const response = await createAirline(airlineData);
      console.log("Airline created:", response.data);
      setApiResponse(response.data);
      setIsAirlineCreated(true);
      // reset form after successful submission
      setFormValues({
        user_name: "",
        password: "",
        email: "",
        air_line_name: "",
        country_id: "",
      });
    } catch (err) {
      console.error("Airline creation failed:", err);
  
      // check if err.response is defined before accessing it
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
      {isAirlineCreated ? (
        <div className="good_response_details">
          <h4>O.K, New Air Line has been created.</h4>
          <AirlineDetails apiResponse={apiResponse} />
        </div>
      ) : (
        <div>
          {errorMessage && (
            <div className="error">
              <p>Error: {errorMessage}</p>
            </div>
          )}
          <div className="add_flight_input">
            Please add Air Line details here, *all fields are required
            <br />
            <br />
          </div>
          <form onSubmit={handleSubmit}>
            <label className="input-label">
              username:<br />
              <input
                type="text"
                name="user_name"
                value={formValues.user_name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="input-label">
              password:<br />
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="input-label">
              Email:<br />
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="input-label">
              Air Line name:<br />
              <input
                type="text"
                name="air_line_name"
                value={formValues.air_line_name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="input-label">
              country_id:<br />
              <input
                type="number"
                name="country_id"
                value={formValues.country_id}
                onChange={handleChange}
              />
            </label>
            <br />
            <br />
            <button type="submit" className="register-button">
              Add new Air Line
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddAirline;