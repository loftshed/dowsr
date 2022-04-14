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
      `http://localhost:9001/api/map-pins?filter=${filter}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const handleSubmitPin = (ev, locationObj) => {
  const submissionObj = {
    type: ev.target[0].value,
    lat: locationObj.lat,
    lng: locationObj.lng,
    address: ev.target[1].value,
    hours: ev.target[2].value,
  };
  console.log(submissionObj);
};

const reverseGeocode = async (ev) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.lngLat.lng},${ev.lngLat.lat}.json?access_token=${MAPBOX_API_KEY}`
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const { center, place_name } = jsonResponse.features[0];
    const addressShort = place_name.split(",")[0];
    return {
      lat: center[1],
      lng: center[0],
      addressShort: addressShort,
      addressFull: place_name,
    };
  } catch (err) {
    console.log(err);
  }
};

export {
  reverseGeocode,
  getUserLocation,
  handleGetPinsOfType,
  handleSubmitPin,
  MAPBOX_API_KEY,
};