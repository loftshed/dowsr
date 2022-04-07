// const { react_app_google_api_key } = process.env;
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { getUserLocation } from "./mapHelpers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibG9mdHNoZWQiLCJhIjoiY2wxbWg1bzg1MGUzYjNkdGN2cWlyejZyeSJ9.Us_qA6Np0kJaHwLEkRpDlQ";
// don't forget this token is now published to github... looool 🤦‍♂️

const MapContainer = () => {
  const { userLocation, setUserLocation } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setUserLocation(await getUserLocation());
      // console.log(userLocation);
    })();
  }, []);

  return (
    <>
      {userLocation && (
        <>
          {/* <p>no map rn to save on api calls :(</p> */}
          {/* <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
              longitude: userLocation.lon,
              latitude: userLocation.lat,
              zoom: 12,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={-122.4} latitude={37.8} color="red" />
          </Map> */}
        </>
      )}
    </>
  );
};

export default MapContainer;
