import React from "react"
import LoginForm from "./LoginForm";



function LoginComp() {
  const handleLoginSuccess = (userData) => {
    console.log("Login success in LoginComp:", userData);
  };

  return (
    <div className="Login">
      {/* passing onLoginSuccess to LoginForm */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginComp;