import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import CountriesTable from "../../tableComps/CountriesTable";
import CountryDetails from "../../tableComps/CountryDetails";


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

  return (
    <div>
      
      {/* check if error or one or multi obj*/}

      {error ? (
        <div className="error">{error}</div>
      ) : countries && Array.isArray(countries) ? (
        <CountriesTable countries={countries} />
      ) : countries && typeof countries === 'object' ? (
        <CountryDetails apiResponse={countries} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default GetCountiesTable;






