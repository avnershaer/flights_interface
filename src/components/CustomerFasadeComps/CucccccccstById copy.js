import React, { useState, useEffect } from "react";
import { AxiosPath } from "../AxiosPath";

function CustById() {
  const [apiResponse, setApiResponse] = useState([]);

  useEffect(() => {
    AxiosPath
      .get("/get_my_tickets/")
      .then(response => {
        setApiResponse(response.data);
      })
      .catch(() => {
        setApiResponse({ error: "An error occurred while fetching data." });
      });
  }, []);


  return (
    <div className="cust-details">
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <div className="cust-details-error">
          {apiResponse.error}
        </div>
      ) : (
        <>
          <p>
            Customer ID:{" "}
            <span style={{ color: "white" }}>{apiResponse?.Details?.cust_id}</span>
          </p>
          <p>
            First Name:{" "}
            <span style={{ color: "white" }}>{apiResponse?.Details?.cust_first_name}</span>
          </p>
          <p>
            Last Name:{" "}
            <span style={{ color: "white" }}>{apiResponse?.Details?.cust_last_name}</span>
          </p>
          <p>
            Address:{" "}
            <span style={{ color: "white" }}>{apiResponse?.Details?.cust_address}</span>
          </p>
          <p>
            Phone Number:{" "}
            <span style={{ color: "white" }}>{apiResponse?.Details?.cust_phone_num}</span>
          </p>
        </>
      )}
    </div>
  );
}

export default CustById;