import React, { useState, useEffect } from "react";
import { AxiosPath } from "../../AxiosPath";
import TicketsTable from "../../tableComps/TicketsTable";
import TicketDetails from "../../tableComps/TicketDetails";

function CustById() {
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AxiosPath.get("/get_my_tickets/")
      .then((response) => {
        console.log('api response:', response.data)
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);
  
  if (error) {
  // if error, render error details
  return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="cust-details">
      
      {/* check if error or one or multi obj*/}

      {error ? (
        <div className="error">{error}</div>
      ) : apiResponse && Array.isArray(apiResponse.Details) ? (
        <TicketsTable tickets={apiResponse} />
      ) : apiResponse && typeof apiResponse.Details === 'object' ? (
        <TicketDetails ticket={apiResponse} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CustById;