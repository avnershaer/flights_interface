import React, {useState, useEffect} from "react";

import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";
import { AxiosPath, getAddTicketDetails } from "../../AxiosPath";

  
function AddTicket(flight_id) {
  const [ticketDetails, setTicketDetails] = useState({flight_id:''})
  const [yesBottunClicked, setYesBottunClicked] = useState(false)
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState("")
  
  useEffect(() => {
    if (yesBottunClicked) {
      // Only make the API call if yesBottunClicked is true
      AxiosPath.post(`/tickets/`)
        .then((result) => {
          console.log("ticket data:", result.data.Details);
          setTicketDetails(result.data.Details);
        })
        .catch((err) => {
          console.error("Error making API call:", err);
          setError(err);
          
        });
    }
  }, [yesBottunClicked, flight_id]); // Include yesBottunClicked and flight_id as dependencies for the effect

  
  const handleApiCallClick = async () => {
    if (flight_id) {
      try {
        const response = await getAddTicketDetails(flight_id);
        setApiResponse(response.data); // set api response in state
      } catch (error) {
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log the error response data
        setApiResponse({error: error.response.data.error},{status: error.response.data.status}); // set api error details in state
      }
    }
  };
  
  const handleNobottun = () => {
    document.location.reload();
  }

  const handleYesBottunClicked = () =>{
    setYesBottunClicked(true);

  }

  if (error) {
    // If there's an error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    
    <div>
      <div className="add_ticket">
         <h3>ARE YOU SURE YOU WANT TO ORDER THIS TICKET?</h3>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FacadeBaseButton value="YES" color="blue" onClick={() => {handleApiCallClick(); handleYesBottunClicked();}}/>
          <FacadeBaseButton value="NO, maybe later" color="blue" onClick={() => handleNobottun()}/>
        </div>
        <div>
          
        ticket details
         
        </div>
      </div>  
    </div>
  

);

}



export default AddTicket;