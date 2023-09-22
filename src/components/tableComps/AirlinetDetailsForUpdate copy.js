import React, { useState, useEffect } from "react";
import { updateAirline } from "../AxiosPath";
import AirlineDetails from "./AirlinetDetails";

function AirlinetDetailsForUpdate({ airLineDetails }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [formValues, setFormValues] = useState({
    air_line_name: "",
    country_id: "",
  });
  const [isAirlineUpdated, setIsAirlineUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // update formValues when airLineDetails prop changes (API response)
  useEffect(() => {
    if (airLineDetails) {
      setFormValues({
        air_line_name: airLineDetails.air_line_name || "",
        country_id: airLineDetails.country_id || "",
      });
    }
  }, [airLineDetails]);

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
      const response = await updateAirline(airlineData);
      console.log("Airline updated:", response.data);
      setApiResponse(response.data);
      setIsAirlineUpdated(true);
      // rreset the form after successful submission
      setFormValues({
        air_line_name: "",
        country_id: "",
      });
    } catch (error) {
      console.error("Airline update failed:", error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  

  return (
    <div className="details">
      {isAirlineUpdated ? (
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
          <h3>
            <span style={{ color: "yellow" }}>Air Line details</span>
          </h3>
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
            country_id:<br/>
            <input
              type="number"
              name="country_id"
              value={formValues.country_id}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit" className="register-button" onClick={handleSubmit}>
            Update Air Line
          </button>
        </div>
      )}
    </div>
  );
}

export default AirlinetDetailsForUpdate;