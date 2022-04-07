// const { react_app_google_api_key } = process.env;
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { getUserLocation } from "./mapHelpers";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibG9mdHNoZWQiLCJhIjoiY2wxbWg1bzg1MGUzYjNkdGN2cWlyejZyeSJ9.Us_qA6Np0kJaHwLEkRpDlQ";

// TODO get user location, initialize map from there

const MapContainer = () => {
  const { userLocation, setUserLocation } = useContext(AppContext);
  useEffect(() => {
    console.log("MapContainer useEffect ran");
    getUserLocation();
  }, []);

  return (
    <>
      <p>no map rn to save on api calls :(</p>
      {/* <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -73.61,
          latitude: 45.52,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map> */}
    </>
  );
};

export default MapContainer;
