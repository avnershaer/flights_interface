import React, { useState } from "react";
import { createCustomer } from "../AxiosPath";

const RegistrationForm = ({ onRegistrationSuccess }) => {

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formValues, setFormValues] = useState({
    user_name: "",
    password: "",
    email: "",
    cust_first_name: "",
    cust_last_name: "",
    cust_adress: "",
    cust_phone_num: "",
    cust_credit_card_num: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // do registration and get the response data
      const response = await createCustomer(formValues);
      console.log("Customer created:", response.data);
      onRegistrationSuccess(response.data); 
    
      setFormValues({
        user_name: "",
        password: "",
        email: "",
        cust_first_name: "",
        cust_last_name: "",
        cust_adress: "",
        cust_phone_num: "",
        cust_credit_card_num: ""
      });
    } catch (err) {
      console.error("Customer creation failed:", err);
    
      // check if err.response is defined before accessing it
      if (err.response && err.response.data) {
        console.log("Error response data:", err.response.data);
        setErrorMessage(err.response.data.details || "An unknown error occurred");
      } else {
        console.error("Network error or unknown error:", err);
        setErrorMessage("An unknown error occurred");
      }
    
      // set the entire error object to the error state variable if needed
      setError(err);
    }
  };

  if (errorMessage) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="input-label">
        User Name:<br />
        <input type="text" name="user_name" value={formValues.user_name} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Password:<br />
        <input type="password" name="password" value={formValues.password} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Email:<br />
        <input type="email" name="email" value={formValues.email} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br /> First Name:<br />
        <input type="text" name="cust_first_name" value={formValues.cust_first_name} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Last Name:<br />
        <input type="text" name="cust_last_name" value={formValues.cust_last_name} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Address:<br />
        <input type="text" name="cust_adress" value={formValues.cust_adress} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Phone Number:<br />
        <input type="tel" name="cust_phone_num" value={formValues.cust_phone_num} onChange={handleChange} />
      </label>

      <label className="input-label">
        <br />Credit Card Number:<br />
        <input type="tel" name="cust_credit_card_num" value={formValues.cust_credit_card_num} onChange={handleChange} />
      </label>

      <button type="submit" className="register-button">Register</button>
    </form>
  );
};

export default RegistrationForm;