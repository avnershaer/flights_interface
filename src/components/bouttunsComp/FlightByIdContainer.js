function FlightByIdContainer({ customIdField, selectedFlightId, handleFlightIdChange, handleApiCallClick, handleDropdownChange, flights, apiResponse }) {
  return (
    <div className="FlightById-container">

      <div>
        <div>
          <span style={{ color: "white" }}>GET FLIGHT DETAILS</span>
        </div>
        <br />
        Enter Id<br />

        <input type="number" placeholder="ID number" value={selectedFlightId} onChange={handleFlightIdChange} min="1" />
      </div>

      <div className="send-id-bottun"  >
        <button onClick={() => handleApiCallClick(customIdField)}>Get flight details</button>
      </div>

      <div className="input-container" style={{ marginBottom: "5px" }}>
        *** if you don't know the ID number, select it from the list:
        <select onChange={handleDropdownChange} value={selectedFlightId}>
          <option value="">select flight</option>
          {flights.map((flight, index) => (
            <option key={index} value={flight.customIdField}>
              - id:{flight[customIdField]} - FROM: {flight.origin_country_flag.country_name} ... TO: {flight.destination_country_flag.country_name}...at: {flight.departure_time ? new Date(flight.departure_time).toLocaleDateString() : ''}
            </option>
          ))}
        </select>

        <br />
      </div>

      <div>
        {/* Additional content */}
      </div>
    </div>
  );
}

export default FlightByIdContainer;