// const { react_app_google_api_key } = process.env;
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState, useMemo } from "react";
import { AppContext } from "../../Context/AppContext";
import { getUserLocation, handleGetPinsOfType } from "../helpers/mapHelpers";
import { centeredFlexColumn, fillSpace } from "../../Styling/StyledComponents";
import styled, { css } from "styled-components";
import Pin from "./Pin";
import MapFilters from "./MapFilters";
import InfoModal from "./InfoModal";
import { MappingContext } from "../../Context/MapContext";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

/*
//TODO: CREATE MAP PIN. 
- user selects a point on the map, that point is saved in state
- a modal should pop up asking the user to describe the point
- the point is pushed to an array of datapoints which are used to populate the map with markers.
STRETCH: when the user submits the map pin, it is pushed into an array for review.
STRETCH: submitted pins can be screened and pushed to a final array in an admin backoffice

//TODO: LOAD MAP POINTS BASED ON DISTANCE RANGE IN VIEWPORT
- no idea how to do this yet

so much useful things here:
https://visgl.github.io/react-map-gl/docs/api-reference/map
https://docs.mapbox.com/mapbox-gl-js/guides/

*/

const MapContainer = () => {
  const { userLocation, setUserLocation, showFilterMenu, setShowFilterMenu } =
    useContext(MappingContext);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [filteredPins, setFilteredPins] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // const handleMapClick = (ev) => {
  //   setSelectedLocation(ev.lngLat);
  //   console.log(ev.lngLat);
  // };

  useEffect(() => {
    (async () => {
      setUserLocation(await getUserLocation());
      setFilteredPins(await handleGetPinsOfType("bike-shops")); // change once other data is available
    })();
  }, [popupInfo, setUserLocation]);

  if (!filteredPins) return null;
  const { pins } = filteredPins;

  const displayedPins = pins.map((pin) => {
    return (
      <Marker
        key={`marker-${pin._id}`}
        longitude={pin.longitude}
        latitude={pin.latitude}
        color={"var(--color-pink)"}
        style={{ cursor: "pointer" }}
        onClick={(ev) => {
          console.log(ev);
        }}
      >
        <Pin
          onClick={() => {
            setPopupInfo(pin);
          }}
        />
      </Marker>
    );
  });

  // const displayedPins = useMemo(
  //   () =>
  //     filteredPins.map((shop) => (
  //       <Marker
  //         key={`marker-${shop.place_id}`}
  //         longitude={shop.longitude}
  //         latitude={shop.latitude}
  //         color={"var(--color-pink)"}
  //         style={{ cursor: "pointer" }}
  //         onClick={(ev) => {
  //           console.log(ev);
  //         }}
  //       >
  //         <Pin
  //           onClick={() => {
  //             setPopupInfo(shop);
  //           }}
  //         />
  //       </Marker>
  //     )),
  //   []
  // );

  // const userPins = useMemo(
  //   () =>
  //     userPins.map((pin) => (
  //       <Marker
  //         key={`marker-${pin.place_id}`}
  //         longitude={pin.longitude}
  //         latitude={pin.latitude}
  //         color={"var(--color-pink)"}
  //         style={{ cursor: "pointer" }}
  //         onClick={(ev) => {
  //           console.log(ev);
  //         }}
  //       >
  //         <Pin
  //           onClick={() => {
  //             setPopupInfo(pin);
  //           }}
  //         />
  //       </Marker>
  //     )),
  //   [userPins]
  // );

  return (
    <MapWrapper>
      {userLocation && (
        <>
          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
            initialViewState={{
              longitude: userLocation.lon,
              latitude: userLocation.lat,
              zoom: 12,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            logoPosition={"top-right"}
          >
            {displayedPins}

            {popupInfo && (
              <Popup
                anchor="top"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeOnClick={false}
                maxWidth={"350px"}

                // onClose={() => setPopupInfo(null)}
              >
                <PopupContainer>
                  <Heading>
                    <h3>{popupInfo.name}</h3>
                  </Heading>
                  <Body>
                    {/* <PlaceImage src={popupInfo.logo} /> */}
                    <a target="_new" href={popupInfo.site}>
                      Website
                    </a>
                  </Body>
                </PopupContainer>
              </Popup>
            )}
            <GeolocateControl position="top-left" />
          </Map>
          <InfoModal message={"test"} />
          <MapFilters
            showFilterMenu={showFilterMenu}
            setShowFilterMenu={setShowFilterMenu}
          />
        </>
      )}
    </MapWrapper>
  );
};

/* {selectedLocation && (
              <Marker
                longitude={selectedLocation?.lng}
                latitude={selectedLocation?.lat}
                color="red"
                style={{ cursor: "pointer" }}
              />
            )} */

export default MapContainer;

const MapWrapper = styled.div`
  ${fillSpace}
`;

const PopupContainer = styled.div`
  user-select: none;
  ${centeredFlexColumn}
  a {
    color: var(--color-super-dark-grey);
  }
`;

const Heading = styled.div`
  h3 {
    color: var(--color-super-dark-grey);
    font-size: 18px;
  }
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
`;

const PlaceImage = styled.img`
  width: 50px;
`;
