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

      // Set user information in a cookie
      Cookies.set("userData", JSON.stringify(response.data));

      // Retrieve and parse userData immediately after setting the cookie
      const userDataFromSessionStorage = JSON.parse(Cookies.get("userData"));

      // Notify the parent component of successful login
      onLoginSuccess(userDataFromSessionStorage);
    } catch (error) {
      // Login failure
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
      <div>{responseMessage}</div> {/* Display response message */}
    </div>
  );
}

export default LoginForm;