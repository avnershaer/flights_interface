import React, { useState, useEffect } from "react";
import { getCustDetailsUserId, updateCustomer } from "../../AxiosPath";
import CustUpdatedtDetails from "../../tableComps/CustUpdatedtDetails";

function UpdateCustDetails() {
  const [apiResponse, setApiResponse] = useState(null);
  const [custId, setcustId] = useState(null);
  const [formValues, setFormValues] = useState({
    cust_first_name: "",
    cust_last_name: "",
    cust_adress: "",
    cust_phone_num: "",
    cust_credit_card_num: "",
    
  });
  const [isCustUpdated, setIscustUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const custUserId = () => {
    // retrieve the user_id from session storage
    const userId = sessionStorage.getItem('id');
  
    // check if userId exists in session storage
    if (userId !== null) {
      // convert the retrieved value to a number if needed
      const userIdNumber = parseInt(userId, 10);
      console.log('User ID:', userIdNumber);
  
      // return user_id or perform other operations
      return userIdNumber;
    } else {
      // handle the case where 'id' is not found in session storage
      console.log('User ID not found in session storage');
      return null; // or handle the absence of the user_id in a suitable way
    }
  };
  const userId = custUserId();

  // update formValues when cust Details changes (API response)
  useEffect(() => {
    const fetchCustDetails = async () => {
      try {
        const response = await getCustDetailsUserId(userId);
        const { data } = response;
  
        if (data && data.Details) {
          // extract cust details
          const { cust_first_name, cust_last_name, cust_adress, cust_phone_num, cust_credit_card_num} = data.Details;
          setcustId(data.Details.cust_id)
          console.log('cust_id:',data.Details.cust_id)
          // update the form values
          setFormValues({
            cust_first_name: cust_first_name || "",
            cust_last_name: cust_last_name || "",
            cust_adress: cust_adress || "",
            cust_phone_num: cust_phone_num || "",
            cust_credit_card_num: cust_credit_card_num || "",
          });
        }
      } catch (error) {
        // handle errors
        console.error("Error fetching customer details:", error);
        setErrorMessage(error.message); 
      }
    };
  
    fetchCustDetails();
  }, [userId]);

  const handleRefresh = () =>{
    window.location.reload();
  }

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
      const custUpdateData = {
        ...formValues,
      };
      console.log("formValues", formValues);
      const response = await updateCustomer(custUpdateData, custId);
      console.log("Customer updated:", response.data);
      setApiResponse(response.data);
      setIscustUpdated(true);
      // reset the form after successful submission
      setFormValues({
        cust_first_name: "",
        cust_last_name: "",
        cust_adress: "",
        cust_phone_num: "",
        cust_credit_card_num: "",
      });
    } catch (error) {
      console.error("customer update failed:", error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

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
      {isCustUpdated ? (
        <div className="good_response_details">
          <h4>O.K, Your details been updated has been updated.</h4>
          <CustUpdatedtDetails apiResponse={apiResponse}/>
        </div>
      ) : (
        <div>
          {errorMessage && (
            <div className="error">
              <p>Error: {errorMessage}</p>
            </div>
          )}
          <h3>
            <span style={{ color: "yellow" }}>Your details</span>
          </h3>
          <label className="input-label">
            First Name:<br />
            <input
              type="text"
              name="cust_first_name"
              value={formValues.cust_first_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Last Name:<br/>
            <input
              type="text"
              name="cust_last_name"
              value={formValues.cust_last_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Address:<br/>
            <input
              type="text"
              name="cust_adress"
              value={formValues.cust_adress}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Phone Number:<br/>
            <input
              type="text"
              name="cust_phone_num"
              value={formValues.cust_phone_num}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            CreditCard Number:<br/>
            <input
              type="number"
              name="cust_credit_card_num"
              value={formValues.cust_credit_card_num}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit" className="register-button" onClick={handleSubmit}>
            Update my details
          </button>
        </div>
      )}
    </div>
  );
}


export default UpdateCustDetails;