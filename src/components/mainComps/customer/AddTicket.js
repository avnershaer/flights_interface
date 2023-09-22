import React, { useState, useEffect } from "react";
import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";
import { getAddTicketDetails } from "../../AxiosPath";
import TicketDetails from "../../tableComps/TicketDetails";

function AddTicket({ flight_id }) {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [yesButtonClicked, setYesButtonClicked] = useState(false); // Renamed the state variable
  const [error, setError] = useState(null);

  const handleNoButton = () => {
    document.location.reload();
  };

  const handleYesButtonClicked = async () => {
    try {
      setYesButtonClicked(true); // Set yesButtonClicked to true
      const response = await getAddTicketDetails(flight_id);
      console.log("ticket created:", response.data);
      setTicketDetails(response.data);
    } catch (error) {
      console.error("ticket creation failed:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || error.message);
    }
  };

  

  if (error) {
    // If there's an error, render error details
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <div >
        {/* conditionally render title */}
        {!yesButtonClicked && (
          <h3>ARE YOU SURE YOU WANT TO ORDER THIS TICKET?</h3>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* conditionally render buttons */}
          {!yesButtonClicked && (
            <>
              <FacadeBaseButton value="YES" color="blue" onClick={() => handleYesButtonClicked()} />
              <FacadeBaseButton value="NO, maybe later" color="blue" onClick={() => handleNoButton()} />
            </>
          )}
        </div>
        <div>
          {ticketDetails !== null && (
            <>
              <TicketDetails apiResponse={ticketDetails}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTicket;