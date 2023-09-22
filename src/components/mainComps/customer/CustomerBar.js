import React from "react";
import { Link } from "react-router-dom";

import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";

function CustomerBar() {
  return (
    

    <div  >
      <br/>
   
  
    
     
   
       
        
        <Link to='/CustById'><FacadeBaseButton width="140px" value='My Tickets'/></Link>
        <Link to='/UpdateCustDetails'><FacadeBaseButton width="140px" value='Update my datails'/></Link>
   
       
      
    </div>  
  

);

}



export default CustomerBar;