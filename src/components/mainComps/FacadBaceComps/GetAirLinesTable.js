import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import AirlinesTable from "../../tableComps/AirlinesTable";


const GetAirLinesTable = () => {
  const [airlines, setAirlines] = useState([]);
  const [error, setError] = useState(null);
   
  useEffect(() => {
    AxiosPath.get('/airlines/')
      .then(result => {
        console.log("flights data:", result.data.Details); 
        setAirlines(result.data.Details);
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

  return <AirlinesTable airlines={airlines}  />;
  }
  
export default GetAirLinesTable;






