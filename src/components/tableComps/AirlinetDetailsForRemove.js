import React, { useState } from "react";
import FacadeBaseButton from "../bouttunsComp/facadeBaseBottun";
import { deleteAirline } from "../AxiosPath";


function AirlinetDetailsForRemove({ apiResponse, selectedAirlineId }) {
  console.log('apiResponse:', apiResponse);
  const [yesButtonClicked, setYesButtonClicked] = useState(false);
  const [ifDeleted, setIfDeleted] = useState(false);
  const [error, setError] = useState("");
  const [ifDeletedApiResponse, setIfDeletedApiResponse] = useState('');


  const handleYesButtonClicked = async () => {
    try {
      setYesButtonClicked(true);
      const response = await deleteAirline(selectedAirlineId);
      console.log("air line deleted:", response.data, 'yesButtonClicked:', yesButtonClicked);
      setIfDeleted(true);
      setIfDeletedApiResponse(response)
      console.log('ifDeleted:', ifDeleted, 'setIfDeletedApiResponse', ifDeletedApiResponse);
    } catch (error) {
      console.error("ticket creation failed:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || error.message);
      setError(error.response?.data?.error || error.message);
      
    }
  };

  const handleNoButton = () => {
    console.log(' handleNoButton button clicked');
    document.location.reload();

  };

  if (error) {
    // render an error message if needed
    return (
      <div className="error">
        <p>{error.response?.data?.error}</p>
      </div>
    );
  }
  return (
    <div className="details">
      {ifDeleted ? (
        <div style={{ border: '1px solid rgb(21, 219, 11)' }}>
          <br/>{ifDeletedApiResponse.data.Datails}<br/><br/></div>
      ) : (
        <>
          <div style={{ backgroundColor: 'rgb(205, 2, 2)', color: 'white' }}>
            ARE YOU SURE?<br /> to remove:<br />
          </div>
          <div style={{ border: '1px solid white' }}>
            <h3>
              <span style={{ color: "white" }}>
                {apiResponse && apiResponse.error ? "" : "Air Line details:"}
              </span>
            </h3>
            {apiResponse && apiResponse.error ? (
              <p>
                <div className="airline-details-error"> {apiResponse.error} </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </p>
            ) : (
              <>
                <p>
                  Air Line ID:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.air_line_id}
                  </span>
                  &nbsp;&nbsp;
                  Airline Name:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.air_line_name}
                  </span>
                </p>
                <p>
                  Country ID:&nbsp;
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.country_id}
                  </span>
                </p>
                <>
                  <FacadeBaseButton value="YES" color="blue" onClick={() => handleYesButtonClicked()} />
                  <FacadeBaseButton value="NO, maybe later" color="blue" onClick={() => handleNoButton()} />
                </>
               
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AirlinetDetailsForRemove;