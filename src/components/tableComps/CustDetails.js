import React from "react";

function CustDetails({ apiResponse }) {
  return (
    <div className="cust-details">
      
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="cust-details-error"> {apiResponse.error} </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>

      ) : (
        <>

          <p>
            Customer ID:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.cust_id}
            </span>
          </p>
          <p>
          First Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.cust_first_name}
            </span>
          </p>
          <p>
            Last Name:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.cust_last_name}
            </span>
          </p>
          <p>
            Adress:
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.cust_adress}
            </span>{" "}
            Phone Number:{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.cust_phone_num}
            </span>
          </p>
        
        </>
      )}
    </div>
  );
}

export default CustDetails;