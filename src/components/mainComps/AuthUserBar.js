import React, { useState, useEffect } from "react";
import lock from "../images/lock.jpg";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import CustomerBar from "./customer/CustomerBar";
import LoginForm from "./LoginForm";
import RegistrationForm from "./Register";
import AirlineBar from "./airline/AirlineBar";
import AdministratorBar from "./administrator/AdministratorBar";

function AuthUserBar({ onLoginSuccess, showLoginForm, showRegisterForm }) {
  const [userInfo, setUserInfo] = useState(null);
  const [showCustomerBar, setShowCustomerBar] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to get the user data from cookies
  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");

    if (userDataFromCookie !== undefined) {
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserInfo(parsedUserData);
        setShowCustomerBar(true);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setError(error.message); // Use error.message to get the error message
      }
    }
  }, []);

  const handleRegistrationSuccess = (userData) => {
    setUserInfo(userData);
    setShowCustomerBar(true);
    Cookies.set("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLoginSuccess = (userData) => {
    setShowCustomerBar(true);
    onLoginSuccess(userData); // utilize the onLoginSuccess prop
    Cookies.set("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  // extract the name from userInfo if it exists
  const userName = userInfo ? userInfo.name : "guest";

  // use a setTimeout to render the login form after a slight delay
  useEffect(() => {
    if (showLoginForm) {
      setTimeout(() => {
        setShowCustomerBar(false);
      }, 0);
    }
  }, [showLoginForm]);

  useEffect(() => {
    if (showRegisterForm) {
      setTimeout(() => {
        setShowCustomerBar(false);
      }, 0);
    }
  }, [showRegisterForm]);

  const handleTryAgainClick = () => {
    console.log('handleTryAgain button clicked');
    document.location.reload();
  };

  if (error) {
    // error message if needed
    return (
      <div className="error">
        <p>Error: {error}</p>
        <p>
          <button
            onClick={handleTryAgainClick}
            style={{ color: 'yellow', fontWeight: 'bold', backgroundColor: 'black' }}
          >
            TRY AGAIN
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="authuserBar">
      <div style={{fontSize: "14px" }}>hello <span style={{ color: "yellow", fontSize: "17px" }}>{userName}</span>!</div>
      <img src={lock} alt="lock_image" width={220} height={100} />
      {console.log('*userdata*', Cookies.get("userData"))}
      {userInfo ? (
        <div>
          Welcome {userName}
          {userInfo.role === 1 && <AdministratorBar />}
          {userInfo.role === 2 && <AirlineBar />}
          {userInfo.role === 3 && <CustomerBar />}
        </div>
      ) : (
        <>
          {showLoginForm && <LoginForm onLoginSuccess={handleLoginSuccess} />}
          {showRegisterForm && (
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
          )}

          {/* check userInfo.role and render the appropriate component if userInfo is defined */}
          {userInfo && (
            <>
              
            </>
          )}

          <Routes>
            <Route path="/CustomerBar" element={<CustomerBar />} />
            <Route path="/AirlineBar" element={<AirlineBar />} />
            <Route path="/AdministratorBar" element={<AdministratorBar />} />
            <Route path="/Register" element={<RegistrationForm />} />
            <Route
              path="/RegistrationForm"
              element={<RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />}
            />
          </Routes>
          
        </>
      )}
    </div>
  );
}

export default AuthUserBar;