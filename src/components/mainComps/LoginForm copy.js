import React, { useState } from "react";
import { Login } from "../AxiosPath";
import Cookies from "js-cookie";

function LoginForm({ onLoginSuccess }) {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Login(user_name, password, {
        withCredentials: true, // include cookies in the request
      });

      console.log("Login success:", response.data);

      // set user information in a cookie
      Cookies.set("userData", JSON.stringify(response.data));
      // delay accessing sessionStorage using the "await" keyword
      await new Promise((resolve) => setTimeout(resolve, 0));

      // after the access sessionStorage
      const userDataFromSessionStorage = sessionStorage.getItem("userData");

      console.log(userDataFromSessionStorage);
      if (userDataFromSessionStorage) {
        const parsedUserData = JSON.parse(userDataFromSessionStorage);
        console.log("User data from sessionStorage:", parsedUserData);
      }
      
      
      
      
      // notify the parent component of successful login
      onLoginSuccess(response.data); // utilize the onLoginSuccess prop
    } catch (error) {
      // login failure 
      console.error("Login failed:", error, user_name, password);

      if (error.response && error.response.data && error.response.data.error) {
        console.log("Error status:", error.response.error);
        console.log("Error data:", error.response.data);
        setResponseMessage("Login failed: " + error.response.data.error);
      } else {
        setResponseMessage("ERROR while logging in.");
      }
    }
  };

  // get the userData from the cookie or set a default value (e.g., null)
  const userDataFromCookie = Cookies.get("userData");

  console.log(userDataFromCookie);
  if (userDataFromCookie !== undefined && userDataFromCookie !== null) {
    // parse the userData string into a JavaScript object
    const parsedUserData = JSON.parse(userDataFromCookie);
    // log the parsed user data retrieved from the cookie
    console.log("User data from cookie:", parsedUserData);
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label htmlFor="user_name">Username:</label>
          <input
            type="text"
            id="user_name"
            value={user_name}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>{responseMessage}</div> {/* display response message */}
    </div>
  );
}

export default LoginForm;