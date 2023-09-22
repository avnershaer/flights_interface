import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import CustomersTable from "../../tableComps/CustomersTable";


function GetCustomersList () {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get('/customers/')
      .then(result => {
        console.log("customers data:", result.data.Details); 
        setCustomers(result.data.Details);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, []);

  if (error) {
    // if error, render error details
    return <div className="error">Error: {error.message}</div>;
  }

  return <CustomersTable customers={customers}  />;
  }



export default GetCustomersList ;