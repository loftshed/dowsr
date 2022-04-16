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

const submitPin = async (ev, locationObj, loggedInUser) => {
  try {
    const submissionObj = {
      type: ev.target.pinType.value,
      latitude: locationObj.lat,
      longitude: locationObj.lng,
      hours: ev.target.hours.value,
      address: ev.target.address.value,
      desc: ev.target.desc.value,
      submittedBy: loggedInUser.username,
      submittedById: loggedInUser._id,
      likedByIds: [],
      dislikedByIds: [],
    };
    console.log(submissionObj);
    const response = await fetch("http://localhost:9001/api/submit-pin", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionObj),
    });

    return await response.json();
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
    const { place_name } = jsonResponse.features[0];
    const addressShort = place_name.split(",")[0];
    return {
      lat: ev.lngLat.lat,
      lng: ev.lngLat.lng,
      addressShort: addressShort,
      addressFull: place_name,
    };
  } catch (err) {
    console.log(err);
  }
};

const forwardGeocode = async (search) => {
  try {
    console.log(search);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${MAPBOX_API_KEY}`
    );
    return await response.json();
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
  forwardGeocode,
  getUserLocation,
  handleGetPinsOfType,
  submitPin,
  getDistanceFromPoint,
  MAPBOX_API_KEY,
};
