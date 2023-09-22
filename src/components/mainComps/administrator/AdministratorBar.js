import React from "react";
import { Link } from "react-router-dom";

import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";

function AdministratorBar() {
  return (
    

    <div  >
      <br/>

        <Link to='/AddAdministrator'><FacadeBaseButton width="160px" value='Add Administrator'/></Link>
        <Link to='/AddAirline'><FacadeBaseButton width="160px" value='Add Air Line'/></Link>
        <Link to='/GetAllTickets'><FacadeBaseButton width="160px" value='Get All Tickets'/></Link>
        <Link to='/GetCustomersList'><FacadeBaseButton width="160px" value='Get Customers List'/></Link>
        <Link to='/RemoveAdministrator'><FacadeBaseButton width="160px" value='Remove Administrator'/></Link>
        <Link to='/RemoveAirline'><FacadeBaseButton width="160px" value='Remove Airline'/></Link>
        <Link to='/RemoveCustomer'><FacadeBaseButton width="160px" value='Remove Customer'/></Link>
        <Link to='/UpdateAdministrator'><FacadeBaseButton width="160px" value='Update Administrator'/></Link>
   
    </div>  
  

);

}



export default AdministratorBar;