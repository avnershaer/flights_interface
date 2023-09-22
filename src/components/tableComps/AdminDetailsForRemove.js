import React, { useState } from "react";
import FacadeBaseButton from "../bouttunsComp/facadeBaseBottun";
import { deleteAdmin } from "../AxiosPath";

function AdminDetailsForRemove({ apiResponse, selectedAdminuserId }) {
  console.log('selectedAdminuserId:', selectedAdminuserId);
  const [yesButtonClicked, setYesButtonClicked] = useState(false);
  const [ifDeleted, setIfDeleted] = useState(false);
  const [error, setError] = useState("");
  const [ifDeletedApiResponse, setIfDeletedApiResponse] = useState('');


  const handleYesButtonClicked = async () => {
    
    try {
      setYesButtonClicked(true);
      const response = await deleteAdmin(selectedAdminuserId);
      console.log("Administrator deleted:", response.data, 'yesButtonClicked:', yesButtonClicked);
      setIfDeleted(true);
      setIfDeletedApiResponse(response)
      console.log('ifDeleted:', ifDeleted, 'setIfDeletedApiResponse', ifDeletedApiResponse);
    } catch (error) {
      console.error("delete procces failed:", error.response?.data?.error || error.message);
      setError(error);
      
    }
  };

  const handleNoButton = () => {
    console.log(' handleNoButton button clicked');
    document.location.reload();

  };

  if (error) {
    // render an error message if needed
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="details">
      {ifDeleted ? (
        <div style={{ border: '1px solid rgb(21, 219, 11)' }}>
          <br/>{ifDeletedApiResponse.data.Datails}<br/><br/></div>
      ) : (
        <>
          <div style={{ backgroundColor: 'rgb(205, 2, 2)', color: 'white' }}>
            ARE YOU SURE?<br /> to remove:<br />
          </div>
          <div style={{ border: '1px solid white' }}>
            <h3>
              <span style={{ color: "white" }}>
                {apiResponse && apiResponse.error ? "" : "Customer details:"}
              </span>
            </h3>
            {apiResponse && apiResponse.error ? (
              <p>
                <div className="airline-details-error"> {apiResponse.error} </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </p>
            ) : (
              <>
                <p>
                  Administrator:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.admin_id}
                  </span>
                  &nbsp;&nbsp;
                  Administrator First Name:{" "}
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.admin_first_name}
                  </span>
                </p>
                <p>
                Administrator Last Name:&nbsp;
                  <span style={{ color: "white" }}>
                    {apiResponse?.Details?.admin_last_name}
                  </span>
                </p>
                <>
                  <FacadeBaseButton value="YES" color="blue" onClick={() => handleYesButtonClicked()} />
                  <FacadeBaseButton value="NO, maybe later" color="blue" onClick={() => handleNoButton()} />
                </>
               
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDetailsForRemove;