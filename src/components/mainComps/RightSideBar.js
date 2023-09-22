import React, { useState, useEffect } from "react";
import AuthUserBar from "./AuthUserBar";
import LoginBottun from "../bouttunsComp/LoginBottun";
import RegisterBottun from "../bouttunsComp/RegisterBottun";
import LogoutComp from "./LogoutComp";
import { logout } from "../AxiosPath";

function RightSideBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login status
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // if session storage contains user data
  useEffect(() => {
    const userData = sessionStorage.getItem("id");
    console.log('userData:', userData)
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  // handle login
  const handleLogin = () => {
    // update the state when the user is successfully logged in
    setShowLoginForm(true);
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setShowRegisterForm(true);
    setIsLoggedIn(true);
  };

  const onLoginSuccess = (loginData) => {
    setShowLoginForm(true);
    setShowRegisterForm(true);
    console.log(loginData);
    document.location.reload();
    setIsLoggedIn(true);
  };

  // handle logout
  const handleLogout = () => {
    console.log("Logging out...");
  
    // clear session data
    sessionStorage.clear();
  
    // clear cookies
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  
    // GET request to the backend to perform server-side logout 
    logout()
      .then((response) => {
        console.log("Logout successful:", response);
  
        // after successful logout, navigate to the login page or home page
        window.location.href = "/login"; // replace with the actual URL of your login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
  
        // if error with logout, navigate to login page
        window.location.href = "/login"; // Replace with the actual URL of your login page
      });
  };
  
  return (
    <div className="RightSideBar">
      <div>
        <div className="log-reg">
          {isLoggedIn ? (
            <>
              <LogoutComp onLogout={handleLogout} />
            </>
          ) : (
            <>
              <LoginBottun value="Login" onClick={handleLogin} />
              <RegisterBottun value="Register" onClick={handleRegister} />
            </>
          )}
        </div>
        <div className="auth-user">
          <AuthUserBar
            isLoggedIn={setIsLoggedIn}
            showLoginForm={showLoginForm}
            showRegisterForm={showRegisterForm}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;