import React from "react";
import LogOutBottun from "../bouttunsComp/LogOutBottun";



function LogoutComp({ onLogout }) {


  
 


    return (
        <div className="Logut">
            <LogOutBottun value='LogOut' onClick={onLogout}/>
          logout  
        </div>
      );
    }

export default LogoutComp;