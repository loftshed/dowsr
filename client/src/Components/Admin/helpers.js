// Approves or rejects a user-submitted pin.
// Targets a pin in the database by its ID.
// If approved === true, the pin is approved and added to the map-pins collection.
// If the 'approved' parameter is not included in the query, the pin is rejected and removed from the map-pins collection

const moderatePendingPin = async (pinId, approved) => {
  try {
    const response = await fetch(
      `http://localhost:9001/api/moderate-pin?&pinId=${pinId}&approved=${approved}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { moderatePendingPin };
