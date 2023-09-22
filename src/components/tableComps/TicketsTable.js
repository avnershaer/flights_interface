import React from "react";
import TextCell from "./TextCell";


const TicketsTable = ({tickets}) => {
  console.log('tickets details:',tickets);

  // check if error in flights prop
  const hasError = tickets && tickets.error;

  if (hasError) {
    // render error message
    return <div>{tickets.error}</div>;
  }
  const details = tickets && tickets.Details;

  return (
    <div className="table-container">
      <h3>Tickets List:</h3>
      <table  border={0} align="center">
        <thead>
          <tr>
            <TextCell text={"first name"} />
            <TextCell text={"last name"} />
            <TextCell text={"adress"} />
            <TextCell text={"phone num"} />
            <TextCell text={"flight id"} />
            <TextCell text={"air line"} />
            <TextCell text={"from"} />
            <TextCell text={"to"} />
          </tr>
        </thead>

        {details && details.map((ticket, index) => (
          <tr key={index}>
            <td>
              <TextCell text={ticket.customer.cust_first_name}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.customer.cust_last_name}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.customer.cust_adress}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.customer.cust_phone_num}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.flight.flight_id}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.flight.air_line_name.air_line_name}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.flight.origin_country_flag.country_name}></TextCell>
            </td>
            <td>
              <TextCell text={ticket.flight.destination_country_flag.country_name}></TextCell>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TicketsTable;