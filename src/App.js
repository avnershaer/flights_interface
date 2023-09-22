import React from "react";
import Header from "./components/mainComps/Header";
import LeftSideBar from "./components/mainComps/FacadBaceComps/LeftSideBar";
import RightSideBar from "./components/mainComps/RightSideBar";
import './App.css';
import { Route, Routes } from "react-router-dom";
import GetAirLinesTable from "./components/mainComps/FacadBaceComps/GetAirLinesTable";
import GetFlightsTable from "./components/mainComps/FacadBaceComps/GetFlightsTable";
import FlightById from "./components/mainComps/FacadBaceComps/FlightById";
import FlightsByOrigCountryId from "./components/mainComps/FacadBaceComps/FlightsByOrigCountryId";
import FlightsByDestCountryId from "./components/mainComps/FacadBaceComps/FlightsByDestCountryId";
import FlightsByAirlineId from "./components/mainComps/FacadBaceComps/FlightsByAirlineId";
import AirlineById from "./components/mainComps/FacadBaceComps/AirlineById";
import UpdateCustDetails from "./components/mainComps/customer/UpdateCustDetails";
import UpdateFlightTicketDetails from "./components/mainComps/customer/UpdateFlightTicketDetails";
import AddFilght from "./components/mainComps/airline/AddFilght";
import GetMyFlights from "./components/mainComps/airline/GetMyFlights";
import RemoveFlight from "./components/mainComps/airline/RemoveFlight";
import UpdateAirline from "./components/mainComps/airline/UpdateAirline";
import UpdateFlight from "./components/mainComps/airline/UpdateFlight";
import AddAdministrator from "./components/mainComps/administrator/AddAdministrator";
import AddAirline from "./components/mainComps/administrator/AddAirline";
import GetAllTickets from "./components/mainComps/administrator/GetAllTickets";
import GetCustomersListList from "./components/mainComps/administrator/GetCustomersList";
import RemoveAdministrator from "./components/mainComps/administrator/RemoveAdministrator";
import UpdateAdministrator from "./components/mainComps/administrator/UpdateAdministrator";
import RemoveAirline from "./components/mainComps/administrator/RemoveAirline";
import RemoveCustomer from "./components/mainComps/administrator/RemoveCustomer";
import GetCountiesTable from "./components/mainComps/FacadBaceComps/GetCountiesTable";
import CountryById from "./components/mainComps/FacadBaceComps/CountryById";
import AirlinesByContryId from "./components/mainComps/FacadBaceComps/AirlinesByContryId";
import DepartureFlightsByCountryId from "./components/mainComps/FacadBaceComps/DepartureFlightsByCountryId";
import LandingFlightsByCountryId from "./components/mainComps/FacadBaceComps/LandingFlightsByCountryId";
import FlightsByLandingDate from "./components/mainComps/FacadBaceComps/FlightsByLandingDate";
import FlightsByDepartureDate from "./components/mainComps/FacadBaceComps/FlightsByDepartureDate";
import AddTicket from "./components/mainComps/customer/AddTicket";
import CustById from "./components/mainComps/customer/CustById";


function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <div className="Content">
        <div className="LeftSideBar">
          <LeftSideBar />
        </div>
        <div className="Middle">
          <Routes>
            <Route index element={<GetFlightsTable />} />
           
            <Route path="/UpdateCustDetails" element={<UpdateCustDetails/>}/>
            <Route path="/UpdateFlightTicketDetails" element={<UpdateFlightTicketDetails/>}/>
            <Route path="/CustById" element={<CustById />} />

            <Route path="/AddFilght" element={<AddFilght/>}/>
            <Route path="/GetMyFlights" element={<GetMyFlights/>}/>
            <Route path="/RemoveFlight" element={<RemoveFlight/>}/>
            <Route path="/UpdateAirline" element={<UpdateAirline/>}/>
            <Route path="/UpdateFlight" element={<UpdateFlight/>}/>
         
         
            <Route path="/GetAirLinesTable" element={<GetAirLinesTable />} />
            <Route path="/GetFlightTable" element={<GetFlightsTable />} />
            <Route path="/FlightById" element={<FlightById />} />
            <Route path="/FlightsByOrigCountryId" element={<FlightsByOrigCountryId />} />
            <Route path="/FlightsByDestCountryId" element={<FlightsByDestCountryId />} />
            <Route path="/FlightsByAirlineId" element={<FlightsByAirlineId />} />
            <Route path="/AirlineById" element={<AirlineById />} />
            
            <Route path="/AddAdministrator" element={<AddAdministrator />} />
            <Route path="/AddAirline" element={<AddAirline />} />
            <Route path="/GetAllTickets" element={<GetAllTickets />} />
            <Route path="/RemoveAirline" element={<RemoveAirline />} />
            <Route path="/GetCustomersList" element={<GetCustomersListList />} />
            <Route path="/RemoveAdministrator" element={<RemoveAdministrator />} />
            <Route path="/RemoveCustomer" element={<RemoveCustomer />} />
            <Route path="/UpdateAdministrator" element={<UpdateAdministrator />} />
            
            <Route path="/GetCountiesTable" element={<GetCountiesTable />} />
            <Route path="/CountryById" element={<CountryById />} />
            <Route path="/AirlinesByContryId" element={<AirlinesByContryId />} />
            <Route path="/DepartureFlightsByCountryId" element={<DepartureFlightsByCountryId/>} />
            <Route path="/LandingFlightsByCountryId" element={<LandingFlightsByCountryId/>} />
            <Route path="/FlightsByLandingDate" element={<FlightsByLandingDate/>} />
            <Route path="/FlightsByDepartureDate" element={<FlightsByDepartureDate/>} />
            <Route path="/AddTicket" element={<AddTicket/>} />
            
          
          
            
          </Routes>
        </div>
        <div className="RightSideBar">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default App;