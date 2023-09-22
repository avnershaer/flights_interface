import React, { useState, useEffect } from "react";
import { getAirlineDetailsUserId, updateAirline } from "../../AxiosPath";
import AirlineUpdatedtDetails from "../../tableComps/AirlineUpdatedtDetails";


function UpdateAirline() {
  const [apiResponse, setApiResponse] = useState(null);
  const [airLineId, setAirLineId] = useState(null);
  const [formValues, setFormValues] = useState({
    air_line_name: "",
    country_id: "",
  });
  const [isAirlineUpdated, setIsAirlineUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const airLineUserId = () => {
    // retrieve the user_id from session storage
    const userId = sessionStorage.getItem('id');
  
    // check if userId exists in session storage
    if (userId !== null) {
      // convert the retrieved value to a number if needed
      const userIdNumber = parseInt(userId, 10);
      console.log('User ID:', userIdNumber);
  
      // return the user_id or perform other operations
      return userIdNumber;
    } else {
      // handle case where 'id' is not found in session storage
      console.log('User ID not found in session storage');
      return null; // or handle the absence of the user_id in a suitable way
    }
  };
  const userId = airLineUserId();

  // update formValues when airLineDetails prop changes (API response)
  useEffect(() => {
    const fetchAirlineDetails = async () => {
      try {
        const response = await getAirlineDetailsUserId(userId);
        const { data } = response;
  
        if (data && data.Details) {
          // extract air_line_name and country_id
          const { air_line_name, country_id } = data.Details;
          setAirLineId(data.Details.air_line_id)
          console.log('air_line_id:',data.Details.air_line_id)
          // update the form values
          setFormValues({
            air_line_name: air_line_name || "",
            country_id: country_id || "",
          });
        }
      } catch (error) {
        // handle errors
        console.error("Error fetching airline details:", error);
        setErrorMessage(error.message); 
      }
    };
  
    fetchAirlineDetails();
  }, [userId]);


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
      const airlineUpdateData = {
        ...formValues,
      };
      console.log("formValues", formValues);
      const response = await updateAirline(airlineUpdateData, airLineId);
      console.log("Airline updated:", response.data);
      setApiResponse(response.data);
      setIsAirlineUpdated(true);
      // reset the form after successful submission
      setFormValues({
        air_line_name: "",
        country_id: "",
      });
    } catch (error) {
      console.error("Airline update failed:", error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  const handleRefresh = () =>{
    window.location.reload();
  }

  if (errorMessage) {
  // if error, render error details
    return (
    <div className="error">
      Error: {errorMessage}
      <button onClick={handleRefresh}>Try again</button>
    </div>
  );  
  }
  
  return (
    <div className="details">
      {isAirlineUpdated ? (
        <div className="good_response_details">
          <h4>O.K, Air Line has been updated.</h4>
          <AirlineUpdatedtDetails apiResponse={apiResponse}/>
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
export default UpdateAirline;