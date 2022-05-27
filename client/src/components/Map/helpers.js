import {
  StoreIcon,
  CoffeeIcon,
  PoliceIcon,
  HazardIcon,
  BikeIcon,
  WaterIcon,
  ToiletIcon,
  PendingIcon,
} from '../../styling/react-icons';

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

const getUserLocation = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/24.48.0.1');
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const handleGetPinsOfType = async (filter) => {
  try {
    const response = await fetch(`https://dowsr.herokuapp.com/api/get-pins?filter=${filter}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const submitPin = async (ev, locationObj, loggedInUser, hours) => {
  console.log(ev);
  console.log(locationObj);
  console.log(loggedInUser);
  console.log(hours);
  try {
    const submissionObj = {
      latitude: locationObj.lat,
      longitude: locationObj.lng,
      hours: hours,
      address: ev.target.address.value,
      desc: ev.target.desc.value,
      submittedBy: loggedInUser.username,
      submittedById: loggedInUser._id,
      likedByIds: [],
      dislikedByIds: [],
    };

    // clunky implementation for now so I can get back to fixing the frontend and applying for jobs 😬

    if (ev.target.water?.checked && ev.target.toilet?.checked) {
      const toiletSubmissionObj = { ...submissionObj, type: 'toilet' };
      const responseToilet = await fetch('https://dowsr.herokuapp.com/api/submit-pin', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toiletSubmissionObj),
      });
      // console.log(responseToilet.json());
      const waterSubmissionObj = { ...submissionObj, type: 'water' };
      const response = await fetch('https://dowsr.herokuapp.com/api/submit-pin', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waterSubmissionObj),
      });
      return await response.json();
    } else {
      let type;
      if (ev.target.water?.checked) {
        type = 'water';
      } else if (ev.target.toilet?.checked) {
        type = 'toilet';
      } else if (ev.target.police?.checked) {
        type = 'police';
      } else if (ev.target.hazard?.checked) {
        type = 'hazard';
      }

      const amendedSubmissionObj = {
        ...submissionObj,
        type: type,
      };

      const response = await fetch('https://dowsr.herokuapp.com/api/submit-pin', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(amendedSubmissionObj),
      });
      return await response.json();
    }

    // TODO: make it so the backend receives the type of pin as an array element so I don't have to add different cases here..

    // return await response.json();
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
    const addressShort = place_name.split(',')[0];
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
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
};

const getPinsPendingReview = async () => {
  try {
    const response = await fetch('https://dowsr.herokuapp.com/api/get-pending-review');
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const togglePinLike = async (pinId, userId, liked) => {
  try {
    const response = await fetch(
      `/api/toggle-like?pinId=${pinId}&userId=${userId}${liked && `&liked=${liked}`}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getPin = async (pinId) => {
  try {
    const response = await fetch(`https://dowsr.herokuapp.com/api/get-pin?pinId=${pinId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getIcon = (type) => {
  switch (type) {
    case 'deps':
      return <StoreIcon />;
    case 'cafes':
      return <CoffeeIcon />;
    case 'police':
      return <PoliceIcon />;
    case 'hazard':
      return <HazardIcon />;
    case 'shops':
      return <BikeIcon />;
    case 'water':
      return <WaterIcon />;
    case 'toilet':
      return <ToiletIcon />;
    case 'pending':
      return <PendingIcon />;
    default:
      return <></>;
  }
};

export {
  getIcon,
  reverseGeocode,
  forwardGeocode,
  getUserLocation,
  handleGetPinsOfType,
  submitPin,
  getDistanceFromPoint,
  getPinsPendingReview,
  togglePinLike,
  getPin,
  MAPBOX_API_KEY,
};
