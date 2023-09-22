import React from "react";

function AdminUpdatedtDetails({ apiResponse }) {
  return (
    <div className="details">
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Administrator new details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="error"> {apiResponse.error} </div>
          
        </p>
      ) : (
        <>
          {apiResponse?.Details?.map((detail, index) => (
            <div key={index}>
              <p>
                Admin ID:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.admin_id}</span>
              </p>
              <p>
                Admin First Name:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.admin_first_name}</span>
              </p>
              <p>
              Admin Last Name:&nbsp;<span style={{ color: "white" }}>{""}</span>
                <span style={{ color: "white" }}>{detail.admin_last_name}</span>
              </p>
              <p>
                User ID:&nbsp;{" "}
                <span style={{ color: "white" }}>{detail.user_id}</span>
              </p>
              <br />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminUpdatedtDetails;