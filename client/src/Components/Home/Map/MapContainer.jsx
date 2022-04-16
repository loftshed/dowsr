import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl } from "react-map-gl";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getUserLocation,
  handleGetPinsOfType,
  handleSubmitPin,
} from "./helpers";
import { fillSpace } from "../../../styling/sharedstyles";
import styled, { css } from "styled-components";
import MapFilters from "./MapFilters";
import PinInfoModal from "./PinInfo/PinInfoModal";
import PinInfoPopup from "./PinInfo/PinInfoPopup";
import PinInfoMarker from "./PinInfo/PinInfoMarker";
import { MappingContext } from "./MappingContext";
import NewPinMarker from "./PinCreation/NewPinMarker";
import { MAPBOX_API_KEY, reverseGeocode } from "./helpers";

const MapContainer = () => {
  // TODO: Figure out why you must double click to create a pin

  const {
    userLocation,
    setUserLocation,
    showFilterMenu,
    setShowFilterMenu,
    selectedMapFilter,
    mapModalMessage,
    popupInfo,
    setPopupInfo,
    clickedLocation,
    setClickedLocation,
    creatingNewPin,
    setPopupIsVisible,
    popupIsVisible,
    pinCreationSuccessful,
    storedFilteredPins,
    setStoredFilteredPins,
  } = useContext(MappingContext);

  const mapRef = useRef();

  // const [popupInfo, setPopupInfo] = useState(null);

  // Begins the process of creating a new pin. First grabs the street address of the clicked location, then records that location in state as clickedLocation.
  const handleBeginPinCreation = async (ev) => {
    try {
      const locationObj = await reverseGeocode(ev);
      setClickedLocation(locationObj);
    } catch (err) {
      console.log(err);
    }
  };

  // Uses built in browser geolocation to get the user's current location, then records that location in state as userLocation.
  const handleGeolocateUser = () => {
    return navigator.geolocation.getCurrentPosition((pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  };

  // Each time the page renders...
  // If creating a new pin, do nothing.
  // Otherwise, if the user has not yet been geolocated, geolocate the user.
  // If no map filter is selected, just show water pins.
  // Otherwise, filter the pins by the selected map filter.
  useEffect(() => {
    (async () => {
      if (creatingNewPin) return;
      if (!userLocation) handleGeolocateUser();
      if (!selectedMapFilter) {
        setStoredFilteredPins(await handleGetPinsOfType("water"));
      } else {
        setStoredFilteredPins(await handleGetPinsOfType(selectedMapFilter));
      }
    })();
  }, [setUserLocation, selectedMapFilter]);

  // If there are no filtered pins in state, do not continue.
  if (!storedFilteredPins) return null;
  // Once pins become available in state destructure them.
  const { pins } = storedFilteredPins;

  return (
    <MapWrapper cursorType={creatingNewPin ? "pointer" : ""}>
      {userLocation && (
        <>
          {creatingNewPin && <Overlay />}
          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
            id="map"
            ref={mapRef}
            initialViewState={{
              longitude: userLocation.lng,
              latitude: userLocation.lat,
              zoom: 12,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            logoPosition={"top-right"}
            onClick={(ev) => {
              if (creatingNewPin) {
                handleBeginPinCreation(ev);
                setPopupIsVisible(!popupIsVisible);
              }
            }}
            cursorModifier={creatingNewPin}
          >
            {!creatingNewPin && !pinCreationSuccessful && (
              <>
                <PinInfoMarker pins={pins} setPopupInfo={setPopupInfo} />
                <GeolocateControl
                  position="top-left"
                  trackUserLocation="true"
                  showUserHeading="true"
                />
                <MapFilters
                  showFilterMenu={showFilterMenu}
                  setShowFilterMenu={setShowFilterMenu}
                />

                <PinInfoPopup
                  popupInfo={popupInfo}
                  setPopupInfo={setPopupInfo}
                />
              </>
            )}
            {clickedLocation && creatingNewPin && popupIsVisible && (
              <NewPinMarker clickedLocation={clickedLocation} />
            )}
          </Map>
          {mapModalMessage !== "" && <PinInfoModal message={mapModalMessage} />}
        </>
      )}
    </MapWrapper>
  );
};

export default MapContainer;

const MapWrapper = styled.div`
  position: relative;
  ${fillSpace}
  overflow: hidden;
  #map canvas {
    cursor: ${(props) => props.cursorType};
  }
`;

const Overlay = styled.div`
  position: absolute;
  background-color: var(--color-pink);
  ${fillSpace}
  z-index: 1;
  opacity: 15%;
  box-shadow: inset 0px 0px 1000px var(--color-teal);
  pointer-events: none;
`;
