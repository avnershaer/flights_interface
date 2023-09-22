import React from "react";
import GetAirLinesTable from "./FacadBaceComps/GetAirLinesTable";
import GetFlightsTable from "./FacadBaceComps/GetFlightsTable";
import FlightById from "./FacadBaceComps/FlightById";
import FlightsByOrigCountryId from "./FacadBaceComps/FlightsByOrigCountryId";
import FlightsByDestCountryId from "./FacadBaceComps/FlightsByDestCountryId";
import FlightsByAirlineId from "./FacadBaceComps/FlightsByAirlineId";
import AirlineById from "./FacadBaceComps/AirlineById";
import CustById from "../CustomerFasadeComps/CustById";
import UpdateCustDetails from "./customer/UpdateCustDetails";
import UpdateFlightTicketDetails from "./customer/UpdateFlightTicketDetails";
import AddFilght from "./airline/AddFilght";
import UpdateFlight from "./airline/UpdateFlight";
import GetMyFlights from "./airline/GetMyFlights";
import RemoveFlight from "./airline/RemoveFlight";
import UpdateAirline from "./airline/UpdateAirline";
import AddAdministrator from "./administrator/AddAdministrator";
import AddAirline from "./administrator/AddAirline";
import GetAllTickets from "./administrator/GetAllTickets";
import GetCustomersListList from "./administrator/GetCustomersList";
import RemoveAdministrator from "./administrator/RemoveAdministrator";
import RemoveAirline from "./administrator/RemoveAirline";
import RemoveCustomer from "./administrator/RemoveCustomer";
import UpdateAdministrator from "./administrator/UpdateAdministrator";
import GetCountiesTable from "./FacadBaceComps/GetCountiesTable";
import CountryById from "./FacadBaceComps/CountryById";
import AirlinesByContryId from "./FacadBaceComps/AirlinesByContryId";
import DepartureFlightsByCountryId from "./FacadBaceComps/DepartureFlightsByCountryId";
import LandingFlightsByCountryId from "./FacadBaceComps/LandingFlightsByCountryId";
import FlightsByLandingDate from "./FacadBaceComps/FlightsByLandingDate";
import FlightsByDepartureDate from "./FacadBaceComps/FlightsByDepartureDate";
import AddTicket from "./customer/AddTicket";









const Middle = () => {
 
  return (
    <div>
     <CustById />
     <GetAirLinesTable/>
     <GetFlightsTable />
     <FlightById customIdField="flight_id" />
     <FlightsByOrigCountryId customIdField="origin country_id" />
     <FlightsByDestCountryId customIdField="destination country_id" />
     <FlightsByAirlineId customIdField="air_line_id " />
     <AirlineById customIdField="air_line_id " />
     <UpdateCustDetails/>
     <UpdateFlightTicketDetails/>
     <GetMyFlights/>
     <AddFilght/>
     <UpdateFlight/>
     <RemoveFlight/>
     <UpdateAirline/>
     <AddAdministrator/>
     <AddAirline/>
     <GetAllTickets/>
     <GetCustomersListList/>
     <RemoveAdministrator/>
     <RemoveAirline/>
     <RemoveCustomer/>
     <UpdateAdministrator/>
     <GetCountiesTable/>
     <CountryById/>
     <AirlinesByContryId/>
     <DepartureFlightsByCountryId/>
     <LandingFlightsByCountryId/>
     <FlightsByLandingDate/>
     <FlightsByDepartureDate/>
     <AddTicket/>
    </div>
  
  
  );

};

export default Middle;