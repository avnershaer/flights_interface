import React from "react";
import { Link } from "react-router-dom";
import FacadeBaseButton from "../../bouttunsComp/facadeBaseBottun";
import airplain2 from "../../images/airplain2.jpg"


function LeftSideBar() {
 
  return (
    

      <div>
        <img src={airplain2} alt="airplain2" width={220} height={100} />
          
          <Link to='GetAirLinesTable'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET air lines Table'/></Link>
          <Link to='GetFlightTable'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET flights Table'/></Link>
          <Link to='GetCountiesTable'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get Countries Table'/></Link>
          <Link to='FlightsByOrigCountryId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET flights By origin country'/></Link>
          <Link to='FlightsByDestCountryId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET flights By destination country Id'/></Link>
          <Link to='FlightsByDepartureDate'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get Flights By Departure Date'/></Link>
          <Link to='FlightsByLandingDate'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get Flights By Landing Date'/></Link>
          <Link to='DepartureFlightsByCountryId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get next 12 hours Departure Flights'/></Link>
          <Link to='LandingFlightsByCountryId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get next 12 hours Arrival Flights'/></Link>
          <Link to='FlightById'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET flight By Id'/></Link>
          <Link to='FlightsByAirlineId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='GET flights By air Line Id'/></Link>
          <Link to='AirlineById'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='ger air Line By Air Line Id'/></Link>
          <Link to='AirlinesByContryId'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get Airlines By Country Id'/></Link>
          <Link to='CountryById'><FacadeBaseButton width="230px" fontSize='12px' height="19px" value='Get Country details By id'/></Link>
         
        
      </div>
    
 
  );

}

export default LeftSideBar;