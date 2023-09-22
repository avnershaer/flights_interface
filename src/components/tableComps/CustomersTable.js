import React from "react";
import TextCell from "./TextCell";


const CustomersTable = ({customers}) => {
  console.log("apiResponse:", customers);
  // check if error in airlines prop
  const hasError = customers && customers.error;

  if (hasError) {
    // error message
    return <div>{customers.error}</div>;
  }
  
  // check error in api response
  if (customers.error) {
    return (
      <div className="error">
      
       
        <p>{customers.error}</p>
      </div>
    );
  }


  return (
    <div className="airline_table-container" >
      <h3>Customers List</h3>
      <table>
        <thead>
        <tr>
          <th className="header-cell">customer id</th>
          <th className="header-cell">first name</th>
          <th className="header-cell">last name</th>
          <th className="header-cell">Address</th>
          <th className="header-cell">phone num</th>
          <th className="header-cell">user id</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <TextCell text={customer.cust_id}></TextCell>
              <TextCell text={customer.cust_first_name}></TextCell>
              <TextCell text={customer.cust_last_name}></TextCell>
              <TextCell text={customer.cust_adress}></TextCell>
              <TextCell text={customer.cust_phone_num}></TextCell>
              <TextCell text={customer.user_id}></TextCell>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default CustomersTable;