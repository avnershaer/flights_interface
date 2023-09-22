import React from "react";

function CustUpdatedtDetails({ apiResponse }) {
  return (
    <div className="details">
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Your new details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="error"> {apiResponse.error} </div>
          <br />
          <br />
          <br />
        </p>
      ) : (
        <>
          {apiResponse?.Details?.map((detail, index) => (
            <div key={index}>
              <p>
                Customer  ID:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.cust_id}</span>
              </p>
              <p>
                First Name:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.cust_first_name}</span>
              </p>
              <p>
                Last Name:&nbsp;<span style={{ color: "white" }}>{""}</span>
                <span style={{ color: "white" }}>{detail.cust_last_name}</span>
              </p>
              <p>
                Addres:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.cust_adress}</span>
              </p>
              <p>
                Phone num:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.cust_phone_num}</span>
              </p>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CustUpdatedtDetails;