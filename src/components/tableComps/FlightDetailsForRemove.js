import React, { useState } from "react";
import FacadeBaseButton from "../bouttunsComp/facadeBaseBottun";
import { deleteFlight } from "../AxiosPath";

function FlightDetailsForRemove({ apiResponse, selectedFlightId }) {
  console.log('selectedFlightId:', selectedFlightId);
  const [yesButtonClicked, setYesButtonClicked] = useState(false);
  const [ifDeleted, setIfDeleted] = useState(false);
  const [error, setError] = useState("");
  const [ifDeletedApiResponse, setIfDeletedApiResponse] = useState('');


  const handleYesButtonClicked = async () => {
    
    try {
      setYesButtonClicked(true);
      const response = await deleteFlight(selectedFlightId);
      console.log("Flight deleted:", response.data, 'yesButtonClicked:', yesButtonClicked);
      setIfDeleted(true);
      setIfDeletedApiResponse(response)
      console.log('ifDeleted:', ifDeleted, 'setIfDeletedApiResponse', ifDeletedApiResponse);
    } catch (error) {
      console.error("delete procces failed:", error.response?.data?.error || error.message);
      setError(error);
      
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
        <p>{error.message}</p>
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
                {apiResponse && apiResponse.error ? "" : "Flight details:"}
              </span>
            </h3>
            {apiResponse && apiResponse.error ? (
              <p>
                <div className="airline-details-error"> {apiResponse.error} </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </p>
            ) : (
              <>
                <p>
                  Flight Id:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.flight_id}
                  </span>
                  &nbsp;&nbsp;
                  From:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.origin_country_flag.country_name}
                  </span>
                </p>
                <p>
                To:&nbsp;
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.destination_country_flag.country_name}
                  </span>
                </p>
                <p>
                At:&nbsp;
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.departure_time}
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

export default FlightDetailsForRemove;