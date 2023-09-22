import React, {useState, useEffect} from "react";
import { AxiosPath, getCustDetailsUserId } from "../../AxiosPath";
import CustomerDetailsForRemove from "../../tableComps/CustomerDetailsForRemove";


function RemoveCustomer () {
  const [customers, setCustomers] = useState([]);
  const [selectedCustuserId, setSelectedCustuserId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [custDetails, setcustDetails] = useState(false)
  const [error, setError] = useState(null)
  

  useEffect(() => {
    AxiosPath.get("/customers/")
      .then((result) => {
        setCustomers(result.data.Details);
      })
      .catch((error) => {
        console.log('err:', error);
        setError(error.message)
      });
  }, []);

  const handleIdChange = (event) => {
    setSelectedCustuserId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedCustuserId) {
      try {
        const response = await getCustDetailsUserId(selectedCustuserId);
        setApiResponse(response.data); // set API response in state
        setcustDetails(true);
      } catch (error) {
        setError(error.response.data.error); // set error message in state
        console.error("Error making API call:", error);
        console.log("Error response data:", error.response.data); // log error response data
        setApiResponse({ error: error.response.data.error, status: error.response.data.status }); // set api error details in state
      }
    }
  };

  const handleDropdownChange = (event) => {
    
    setSelectedCustuserId(event.target.value);
    console.log("11111111111111111111.selectedCustuserId:",selectedCustuserId);
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
         <h3><span style={{ color: "yellow" }}>REMOVE CUSTOMER FROM SYSTEM</span></h3> 
        </div>  
             
        Enter customer id to remove<br/>              
       
        <input type="number" placeholder="Customer ID" value={selectedCustuserId} onChange={handleIdChange} min="1"/>
      </div>

      <div className="send-id-bottun"  > 
        <button onClick={handleApiCallClick} style={{ color: 'white', fontWeight: 'bold', backgroundColor: 'red'   }}>REMOVE CUSTOMER</button>
      </div>
      
      *** if you don't know the customer ID number, select it from the list:
      

      <div className="input-container" style={{ marginBottom: "5px" }}>
        
        <select onChange={handleDropdownChange} value={selectedCustuserId}>
          <option value="">select customer</option>
          {customers.map((customer) => (
            <option key={customer.user_id} value={customer.user_id}>
              - id:{customer.user_id} -  name: {customer.cust_first_name}  {customer.cust_last_name}
            </option>
          ))}
        </select>
        
        <br/>
      </div>
      
      <div className="datails">
      {custDetails?(
      <CustomerDetailsForRemove apiResponse={apiResponse} selectedCustuserId={selectedCustuserId} />
      ):(
      <div> </div> 
      )
    }
      </div>
    </div>
  );
}

export default RemoveCustomer ;