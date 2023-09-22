import React, { useState, useEffect } from "react";
import { AxiosPath, getDetailsById } from "../AxiosPath";

function GenericById({ entityType, idKey, detailsKey, endpoint }) {
  const [entities, setEntities] = useState([]);
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    AxiosPath.get(endpoint)
      .then((result) => {
        setEntities(result.data.Details);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [endpoint]);

  const handleEntityIdChange = (event) => {
    setSelectedEntityId(event.target.value);
  };

  const handleApiCallClick = async () => {
    if (selectedEntityId) {
      try {
        const response = await getDetailsById(entityType, selectedEntityId);
        setApiResponse(response.data);
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  return (
    <div>
      <h3>Select {entityType} id</h3>
      <select onChange={handleEntityIdChange} value={selectedEntityId}>
        <option value="">select {entityType} {idKey}</option>
        {entities.map((entity) => (
          <option key={entity[idKey]} value={entity[idKey]}>
            {entity[idKey]}
          </option>
        ))}
      </select>
      <div>
        <h3>Enter {entityType} {idKey}</h3>
        <input
          type="number"
          placeholder={`*** ${entityType} ${idKey} ***`}
          value={selectedEntityId}
          onChange={handleEntityIdChange}
          min="1"
        />
      </div>
      <div>
        <button onClick={handleApiCallClick}>Make API Call</button>
      </div>
      <div>
        {apiResponse && (
          <div>
            <h3>{entityType} details:</h3>
            {Object.keys(apiResponse.Details).map((key) => (
              <p key={key}>
                {key}: {apiResponse.Details[key][detailsKey]}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenericById;