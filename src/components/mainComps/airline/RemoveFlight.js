import React, {useState, useEffect} from "react";
import { AxiosPath, getFlightDetails } from "../../AxiosPath";
import FlightDetailsForRemove from "../../tableComps/FlightDetailsForRemove";


function RemoveFlight() {
  const [filghts, setFlights] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [flightDetails, setFlightDetails] = useState(false)
  const [error, setError] = useState(null)
  


  useEffect(() => {
    AxiosPath.get('/get_my_flights/')
      .then((result) => {
        setFlights(result.data.Details);
      })
      .catch((error) => {
        console.log('err:', error);
        const errorMessage = error.response?.data?.error || "An error occurred.";
        setError(errorMessage)
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedFlightId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedFlightId) {
      try {
        const response = await getFlightDetails(selectedFlightId);
        setApiResponse(response.data); // set the API response in state
        setFlightDetails(true);
      } catch (error) {
        setError(error.response.data.error); // set the error message in state
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log error response data
        setApiResponse({ error: error.response.data.error, status: error.response.data.status }); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    
    setSelectedFlightId(event.target.value);
    console.log("**.selectedCustuserId:",selectedFlightId);
  };

  const handleTryAgainClick = () =>{
    
    console.log(' handleNoButton button clicked');
    document.location.reload();
      
  }

  if (error) {
    // error message if needed
    return (
      <div className="error">
        <p>error::{error}</p>
        <p><button onClick={handleTryAgainClick} style={{ color: 'yellow', fontWeight: 'bold', backgroundColor: 'black'   }}>TRY AGAIN</button></p>
      </div>
    );
  }
  return (
    <div className="AirlineById-container">
      
      <div>
        <div>
         <h3><span style={{ color: "yellow" }}>REMOVE FLIGHT FROM SYSTEM</span></h3> 
        </div>  
             
        Enter flight id to remove<br/>              
       
        <input type="number" placeholder="Flight ID" value={selectedFlightId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick} style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red'   }}>REMOVE FLIGHT</button>
      </div>
      
      *** if you don't know the flight ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedFlightId}>
          <option value="">select flight</option>
          {filghts.map((flight) => (
            <option key={flight.flight_id} value={flight.flight_id}>
              - id:{flight.flight_id} -  FROM: {flight.origin_country_flag.country_name} ... TO: {flight.destination_country_flag.country_name}...at: {flight.departure_time ? new Date(flight.departure_time).toLocaleDateString():''}
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div className="datails">
      {flightDetails?(
      <FlightDetailsForRemove apiResponse={apiResponse} selectedFlightId={selectedFlightId} />
      ):(
      <div> </div> 
      )
    }
      </div>
    </div>
  );
}



export default RemoveFlight;