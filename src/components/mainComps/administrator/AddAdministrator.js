import React, { useState } from "react";
import { createAdmin } from "../../AxiosPath";
import AdminiDetails from "../../tableComps/AdminiDetails";



function AddAdministrator() {
  
    const [error, setError] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);
    const [formValues, setFormValues] = useState({
      user_name:"",
      password:"",
      email:"",
      admin_first_name: "",
      admin_last_name: "",
    });
    const [isAdminCreated, setIsAdminCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");  
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
      const adminData = {
       ...formValues
      };
      console.log("formValues", formValues);
      const response = await createAdmin(adminData);
      console.log("admin created:", response.data);
      setApiResponse(response.data)
      setIsAdminCreated(true);
      // reset form after successful submission
      setFormValues({
        user_name:"",
        password:"",
        email:"",
        admin_first_name: "",
        admin_last_name: "",
        });
    } catch (err) {
      console.error("Admin creation failed:", err.message);
      if (err.response && err.message) {
        console.log("Error response data:", err.message);
        setErrorMessage(err.response.data.details || "An unknown error occurred");
      } else {
        console.error("Network error or unknown error:", err);
        setErrorMessage("An unknown error occurred");
      }
      setError(err);
    }
  };
  
  if (errorMessage) {
    // if error render error details
    return <div className="error">Error: {error.message}</div>;
  }

    return (
      <div className="details1">
        {isAdminCreated ? (
        <div className="details1">
          <h4>O.K, New administrator been crated.</h4>
          <AdminiDetails apiResponse={apiResponse}/>
        </div>
         ) : (
        <div >
        <div className="input">Please add administrator details here, *all fields are required<br/><br/></div>
        <form onSubmit={handleSubmit}>
        
          <label className="input-label">
            username:&nbsp;
            <input
              type="text"
              name="user_name"
              value={formValues.user_name}
              onChange={handleChange}
            />
          </label>
          <br/><br/>
          <label className="input-label">
            password:&nbsp;
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
          &nbsp;&nbsp;&nbsp;
          <label className="input-label">
            Email:&nbsp;
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <br/><br/>
          
          <label className="input-label">
            First name:&nbsp;
            <input
              type="text"
              name="admin_first_name"
              value={formValues.admin_first_name}
              onChange={handleChange}
              title="****title****"
            />
          </label>
          &nbsp;&nbsp;&nbsp;
          <label className="input-label">
            Last name:&nbsp;
            <input
              type="text"
              name="admin_last_name"
              value={formValues.admin_last_name}
              onChange={handleChange}
            />
          </label>
          <br/><br/>
          <button type="submit" className="register-button">
            Add new administrator
          </button>
        </form>
        <br/>
        {errorMessage && (
        <div className="error">
          <p>Error: {errorMessage}</p>
        </div>
        )}
      </div>
      )}
      </div>
    );
  }
  


export default AddAdministrator;