import React, {useState, useEffect} from "react";
import { AxiosPath, getAdminDetailsUserId } from "../../AxiosPath";
import CustomerDetailsForRemove from "../../tableComps/CustomerDetailsForRemove";
import AdminDetailsForRemove from "../../tableComps/AdminDetailsForRemove";


function RemoveAdministrator () {
  const [admins, setAdmins] = useState([]);
  const [selectedAdminuserId, setSelectedAdminuserId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [adminDetails, setAdminDetails] = useState(false)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    AxiosPath.get("/administrators_list/")
      .then((result) => {
        setAdmins(result.data.Details);
      })
      .catch((error) => {
        console.log('err:', error);
        setError(error.message)
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedAdminuserId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedAdminuserId) {
      try {
        const response = await getAdminDetailsUserId(selectedAdminuserId);
        setApiResponse(response.data); // se API response in state
        setAdminDetails(true);
      } catch (error) {
        setError(error.response.data.error); // set error message in state
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log error response data
        setApiResponse({ error: error.response.data.error, status: error.response.data.status }); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    
    setSelectedAdminuserId(event.target.value);
    console.log("**.selectedCustuserId:",selectedAdminuserId);
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
         <h3><span style={{ color: "yellow" }}>REMOVE ADMINISTRATOR FROM SYSTEM</span></h3> 
        </div>  
             
        Enter administrator id to remove<br/>              
       
        <input type="number" placeholder="Administrator ID" value={selectedAdminuserId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick} style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red'   }}>REMOVE ADMINISTRATOR</button>
      </div>
      
      *** if you don't know the administrator ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedAdminuserId}>
          <option value="">select administrator</option>
          {admins.map((admin) => (
            <option key={admin.user_id} value={admin.user_id}>
              - id:{admin.user_id} -  name: {admin.admin_first_name}  {admin.admin_last_name}
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div className="datails">
      {adminDetails?(
      <AdminDetailsForRemove apiResponse={apiResponse} selectedAdminuserId={selectedAdminuserId} />
      ):(
      <div> </div> 
      )
    }
      </div>
    </div>
  );
}

export default RemoveAdministrator ;