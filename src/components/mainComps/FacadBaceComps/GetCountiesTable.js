import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import CountriesTable from "../../tableComps/CountriesTable";


const GetCountiesTable = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get('/countries/')
      .then(result => {
        console.log("counties data:", result.data.Details); 
        setCountries(result.data.Details);
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

  return <CountriesTable countries={countries}  />;
  }

export default GetCountiesTable;






