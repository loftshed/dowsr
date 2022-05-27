// Approves or rejects a user-submitted pin.
// Targets a pin in the database by its ID.
// If approved === true, the pin is approved and added to the map-pins collection.
// If the 'approved' parameter is not included in the query, the pin is rejected and removed from the map-pins collection

const moderatePendingPin = async (pinId, approved, username, type) => {
  try {
    const response = await fetch(
      `https://dowsr.herokuapp.com/api/moderate-pin?&pinId=${pinId}&approved=${approved}&username=${username}&type=${type}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { moderatePendingPin };
