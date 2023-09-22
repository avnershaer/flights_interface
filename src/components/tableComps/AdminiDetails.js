import React from "react";

function AdminiDetails({ apiResponse }) {
  return (
    <div className="details">
      
      <h3>
        <span style={{ color: "white" }}>
          {apiResponse && apiResponse.error ? "" : "Administrator details:"}
        </span>
      </h3>
      {apiResponse && apiResponse.error ? (
        <p>
          <div className="details-error"> {apiResponse.error} </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>

      ) : (
        <>
          <p>
          New Administrator Id:&nbsp;{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.admin_id}
            </span>
          </p>
          <p>
          New Admin User Id:&nbsp;{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.user_id}
            </span>
          </p>
          <p>
          First name:&nbsp;{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.admin_first_name}
            </span>
          </p>
          <p>
          Last name:&nbsp;{" "}
            <span style={{ color: "white" }}>
              {apiResponse?.Details?.admin_last_name}
            </span>
          </p>
          
          
        </>
      )}
    </div>
  );
}

export default AdminiDetails;