import React, { useState, useEffect } from "react";
import { AxiosPath, getAirlineDetails } from "../../AxiosPath";
import AirlinetDetailsForRemove from "../../tableComps/AirlinetDetailsForRemove";

function RemoveAirline () {
  const [airlines, setAirlines] = useState([]);
  const [selectedAirlineId, setSelectedAirlineId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [airlineDetails, setAirlineDetails] = useState(false)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    AxiosPath.get("/airlines/")
      .then((result) => {
        setAirlines(result.data.Details);
      })
      .catch((error) => {
        console.log('err:', error);
        setError(error.message)
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedAirlineId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedAirlineId) {
      try {
        const response = await getAirlineDetails(selectedAirlineId);
        setApiResponse(response.data); // set API response in state
        setAirlineDetails(true);
      } catch (error) {
        setError(error.response.data.error); // set error message in state
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log error response data
        setApiResponse({ error: error.response.data.error, status: error.response.data.status }); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedAirlineId(event.target.value);
  };

  const handleTryAgainClick = () =>{
    
    console.log(' handleNoButton button clicked');
    document.location.reload();
      
  }

  if (error) {
    // if error, render error details
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
         <h3><span style={{ color: "yellow" }}>REMOVE AIR LINE FROM SYSTEM</span></h3> 
        </div>  
             
        Enter airline id remove<br/>              
       
        <input type="number" placeholder="Air Line ID" value={selectedAirlineId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick} style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red'   }}>REMOVE AIR LINE</button>
      </div>
      
      *** if you don't know the Air Line ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedAirlineId}>
          <option value="">select air line</option>
          {airlines.map((airline) => (
            <option key={airline.user_id} value={airline.user_id}>
              - id:{airline.user_id} -  Air Line: {airline.air_line_name} 
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div className="datails">
      {airlineDetails?(
      <AirlinetDetailsForRemove apiResponse={apiResponse} selectedAirlineId={selectedAirlineId} />
      ):(
      <div> </div> 
      )
    }
      </div>
    </div>
  );
}

export default RemoveAirline ;