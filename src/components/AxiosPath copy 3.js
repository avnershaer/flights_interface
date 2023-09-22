import axios from "axios";
import { useState } from "react";
// set Axios defaults for XSRF token header and cookie name
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// retrieve user data from the session cookie as plain text



// Function to get the CSRF token from cookies
function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
      return parts.pop().split(";").shift();
  }
  return null;
}


// creating Axios instance with custom headers
const AxiosPath = axios.create({
  //baseURL: "http://127.0.0.1:8000/flight_tick_order_sys",

  baseURL: "https://avnersite.com/flight_sys_backend/flight_tickets_order_system/",  withCredentials: true,
  headers: {
    // the headers from sessionStorage
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("id"),
  },
});


AxiosPath.interceptors.request.use(
  function (config) {
    console.log("Request:", config);
    return config;
  },
  function (error) {
    const [err, setErr] = useState(null);
    console.error("Request Error:", error);
    setErr('error:', err)
    Promise.reject(error)
    return (<div className="error">Error: {error.message}</div>);
  }

);



AxiosPath.interceptors.response.use(
  function (response) {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    const [err, setErr] = useState(null);
    console.error("Response Error:", error);
    setErr('error:', err)
    Promise.reject(error)
    return (<div className="error">Error: {error.message}</div>);
  }
);


const getFlightDetails = (customIdField) => {
  return AxiosPath.get(`/flight/${customIdField}/`);
};

const getCountryDetails = (customIdField) => {
  return AxiosPath.get(`/country_by_id/${customIdField}/`);
};

const FlightsDetailsByOrigCountryId = (customIdField) => {
  return AxiosPath.get(`/get_flights_by_origin_country_id/${customIdField}/`);
};

const LandFlightsDetailsByDate = (customIdField) => {
  return AxiosPath.get(`/get_flights_by_landing_date/${customIdField}/`);
};

const DepartFlightsDetailsByDate = (customIdField) => {
  return AxiosPath.get(`/get_flights_by_departure_date/${customIdField}/`);
};

const FlightsDetailsByDestCountryId = (customIdField) => {
  return AxiosPath.get(`/get_flights_by_destination_country_id/${customIdField}/`);
};
const FlightsDetailsByAirlineyId = (customIdField) => {
  return AxiosPath.get(`/get_flights_by_air_line_id/${customIdField}/`);
};

const AirlineDetailsByCountryId = (customIdField) => {
  return AxiosPath.get(`/get_airline_by_country_id/${customIdField}/`);
};

const DepartFlightsByCountryId = (customIdField) => {
  return AxiosPath.get(`/get_departure_flights_by_country_id/${customIdField}/`);
};

const LandFlightsByCountryId = (customIdField) => {
  return AxiosPath.get(`/get_arrival_flights_by_country_id/${customIdField}/`);
};

const getAirlineDetails = (customIdField) => {
  return AxiosPath.get(`/airline_by_id/${customIdField}/`);
};


const getAirlineDetailsUserId = (customIdField) => {
  return AxiosPath.get(`/air_line_by_user_id/${customIdField}/`);
};

const getCustDetailsUserId = (customIdField) => {
  return AxiosPath.get(`/customer_by_user_id/${customIdField}/`);
};

const getAdminDetailsUserId = (customIdField) => {
  console.log('customIdField', customIdField)
  return AxiosPath.get(`/admin_by_user_id/${customIdField}/`);
};

const Login = (user_name, password) => {
  return AxiosPath.post("/login/", { user_name, password });
};

const getAddTicketDetails = (flight_id) => {
  // create an object with the flight_id key and the value
  const requestData = {
    flight_id: flight_id,
  };

  return AxiosPath.post("/tickets/", requestData);
};

const logout = () => {
  return AxiosPath.get("/logout/");
};

const createCustomer = (customerData) => {
  return AxiosPath.post("/add_customer/", customerData);
};

const createFlight = (flightData) => {
  return AxiosPath.post("/add_flight/", flightData);
};

const createAdmin = (adminData) => {
  return AxiosPath.post("/administrators/", adminData);
};

const createAirline = (airlineData) => {
  return AxiosPath.post("/add_airline/", airlineData);
};

const updateAirline = (airlineUpdateData, air_line_id) => {
  return AxiosPath.put(`/airline/${air_line_id}/`, airlineUpdateData);
};

const updateCustomer = (custUpdateData, cust_id) => {
  return AxiosPath.put(`/customer/${cust_id}/`, custUpdateData);
};

const updateFlight = (flight_id, flightUpdateData) => {
  
  return AxiosPath.put(`/update_flight/${flight_id}/`, flightUpdateData);
};

const updateAdmin = (adminUpdateData, admin_id) => {
  return AxiosPath.put(`/administrator/${admin_id}/`, adminUpdateData);
};

const deleteAirline = (air_line_user_id) => {
  return AxiosPath.delete(`/remove_airline/${air_line_user_id}/`);
};

const deleteCustomer = (cust_id_user_id) => {
  return AxiosPath.delete(`/remove_customer/${cust_id_user_id}/`);
};

const deleteAdmin = (cust_id_user_id) => {
  return AxiosPath.delete(`/remove_administrator/${cust_id_user_id}/`);
};

const deleteFlight = (flight_id) => {
  return AxiosPath.delete(`/remove_flight/${flight_id}/`);
};


export {
   AxiosPath, 
   getFlightDetails,FlightsDetailsByOrigCountryId, 
  FlightsDetailsByDestCountryId, FlightsDetailsByAirlineyId,getAirlineDetails, 
  Login, createCustomer, getCountryDetails, AirlineDetailsByCountryId, 
  DepartFlightsByCountryId, LandFlightsByCountryId, LandFlightsDetailsByDate, logout,
  DepartFlightsDetailsByDate, createFlight, getAddTicketDetails, createAdmin,
  createAirline, updateAirline, getAirlineDetailsUserId, getAdminDetailsUserId, 
  updateAdmin, updateFlight, getCustDetailsUserId, updateCustomer, deleteAirline, 
  deleteCustomer, deleteAdmin, deleteFlight
 };