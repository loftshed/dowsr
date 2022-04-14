const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

const getUserLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/24.48.0.1");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const handleGetPinsOfType = async (filter) => {
  try {
    const response = await fetch(
      `http://localhost:9001/api/get-pins?filter=${filter}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const handleSubmitPin = async (ev, locationObj) => {
  try {
    const submissionObj = {
      type: ev.target[0].value,
      lat: locationObj.lat,
      lng: locationObj.lng,
      address: ev.target[1].value,
      hours: ev.target[2].value,
    };
    const response = await fetch("http://localhost:9001/api/submit-pin", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionObj),
    });
    console.log(response.json());
  } catch (error) {
    console.log(error);
  }
};

const reverseGeocode = async (ev) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.lngLat.lng},${ev.lngLat.lat}.json?access_token=${MAPBOX_API_KEY}`
    );
    const jsonResponse = await response.json();
    const { center, place_name } = jsonResponse.features[0];
    const addressShort = place_name.split(",")[0];
    return {
      // lat: center[1],
      // lng: center[0],
      lat: ev.lngLat.lat,
      lng: ev.lngLat.lng,
      addressShort: addressShort,
      addressFull: place_name,
    };
  } catch (err) {
    console.log(err);
  }
};

const getDistanceFromPoint = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2)
  );
};

export {
  reverseGeocode,
  getUserLocation,
  handleGetPinsOfType,
  handleSubmitPin,
  getDistanceFromPoint,
  MAPBOX_API_KEY,
};
