import React from "react";
import { Link } from "react-router-dom";

import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";

function AirlineBar() {
  return (
    

    <div  >
      <br/>
   
  
    
     
   
       
        <Link to='/GetMyFlights'><FacadeBaseButton width="140px" value='Get My Flights'/></Link>
        <Link to='/UpdateAirline'><FacadeBaseButton width="140px" value='Update Air Line'/></Link>
        <Link to='/AddFilght'><FacadeBaseButton width="140px" value='Add Filght'/></Link>
        <Link to='/UpdateFlight'><FacadeBaseButton width="140px" value='Update Filght'/></Link>
        <Link to='/RemoveFlight'><FacadeBaseButton width="140px" value='Remove Filght'/></Link>
   
       
      
    </div>  
  

);

}



export default AirlineBar;