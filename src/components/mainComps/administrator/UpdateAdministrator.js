import React, { useState, useEffect } from "react";
import { getAdminDetailsUserId, updateAdmin } from "../../AxiosPath";
import AdminUpdatedtDetails from "../../tableComps/AdminUpdatedtDetails";


function UpdateAdministrator () {
  const [apiResponse, setApiResponse] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [formValues, setFormValues] = useState({
    admin_first_name: "",
    admin_last_name: "",
  });
  const [isAdminUpdated, setIsAdminUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const adminUserId = () => {
    // retrieve user_id from session storage
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
  const userId = adminUserId();

  // update formValues when adminDetails prop changes (API response)
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await getAdminDetailsUserId(userId);
        const { data } = response;
        console.log('response:',getAdminDetailsUserId(userId))
        if (data && data.Details) {
          // extract admin_first_name and admin_last_name
          const { admin_first_name, admin_last_name } = data.Details;
          setAdminId(data.Details.admin_id)
          console.log('admin_id:',data.Details.admin_id)
          // Update the form values
          setFormValues({
            admin_first_name: admin_first_name || "",
            admin_last_name: admin_last_name || "",
          });
        }
      } catch (error) {
        // handle errors
        console.error("Error fetching admin details:", error);
        setErrorMessage(error.message); 
      }
    };
  
    fetchAdminDetails();
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
      const adminUpdateData = {
        ...formValues,
      };
      console.log("formValues", formValues);
      const response = await updateAdmin(adminUpdateData, adminId);
      console.log("Admin updated:", response.data);
      setApiResponse(response.data);
      setIsAdminUpdated(true);
      // reset form after successful submit
      setFormValues({
        admin_first_name: "",
        admin_last_name: "",
      });
    } catch (error) {
      console.error("Admin update failed:", error.response.data.error);
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
      {isAdminUpdated ? (
        <div className="good_response_details">
          <h4>O.K, Admin has been updated.</h4>
          <AdminUpdatedtDetails apiResponse={apiResponse}/>
        </div>
      ) : (
        <div>
          {errorMessage && (
            <div className="error">
              <p>Error: {errorMessage}</p>
            </div>
          )}
          <h3>
            <span style={{ color: "yellow" }}>Administrator details</span>
          </h3>
          <label className="input-label">
            Admin First Name:<br />
            <input
              type="text"
              name="admin_first_name"
              value={formValues.admin_first_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="input-label">
            Admin Last Name:<br/>
            <input
              type="text"
              name="admin_last_name"
              value={formValues.admin_last_name}
              onChange={handleChange}
            />
          </label>
          <br/> <br/>
          <button type="submit" className="register-button" onClick={handleSubmit}>
            Update Administrator
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateAdministrator;