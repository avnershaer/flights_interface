import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import TicketsTable from "../../tableComps/TicketsTable";

function GetAllTickets () {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get('/get_all_tickets/')
      .then(result => {
        console.log("tickets data:", result.data); 
        setTickets(result.data);
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

  return <TicketsTable tickets={tickets}/>;
};





export default GetAllTickets;