import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl } from "react-map-gl";
import { useContext, useEffect, useState } from "react";
import {
  getUserLocation,
  handleGetPinsOfType,
  handleSubmitPin,
} from "./mapHelpers";
import { fillSpace } from "../../Styling/StyledComponents";
import styled from "styled-components";
import MapFilters from "./MapFilters";
import InfoModal from "./Modals/InfoModal";
import InfoPopup from "./Popups/InfoPopup";
import DisplayedPinsMarker from "./Markers/DisplayedPinsMarker";
import { MappingContext } from "./MappingContext";
import NewPinMarker from "./Markers/NewPinMarker";
import { MAPBOX_API_KEY, reverseGeocode } from "./mapHelpers";

/*
TODO: the point is pushed to an array of datapoints which are used to populate the map with markers.
STRETCH: when the user submits the map pin, it is pushed into an array for review.
STRETCH: submitted pins can be screened and pushed to a final array in an admin backoffice
STRETCH: LOAD MAP POINTS BASED ON DISTANCE RANGE IN VIEWPORT

USEFUL:
https://visgl.github.io/react-map-gl/docs/api-reference/map
https://docs.mapbox.com/mapbox-gl-js/guides/
*/

const MapContainer = () => {
  const {
    userLocation,
    setUserLocation,
    showFilterMenu,
    setShowFilterMenu,
    selectedMapFilter,
    mapModalMessage,
    setShowPinCreationModal,
    showPinCreationModal,
    // popupInfo,
    // setPopupInfo,
    clickedLocation,
    setClickedLocation,
    setCreatingNewPin,
    creatingNewPin,
    setPopupIsVisible,
    popupIsVisible,
  } = useContext(MappingContext);

  const [popupInfo, setPopupInfo] = useState(null);
  const [storedFilteredPins, setStoredFilteredPins] = useState(null);

  const handleBeginPinCreation = async (ev) => {
    try {
      const locationObj = await reverseGeocode(ev);
      setClickedLocation(locationObj);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGeolocateUser = () => {
    return navigator.geolocation.getCurrentPosition((pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  };

  useEffect(() => {
    (async () => {
      if (creatingNewPin) return;
      handleGeolocateUser();
      if (!selectedMapFilter) {
        setStoredFilteredPins(await handleGetPinsOfType("bike-shops"));
        return;
      } // for now, just load bike shops if no filter selected
      setStoredFilteredPins(await handleGetPinsOfType(selectedMapFilter));
    })();
  }, [setUserLocation, selectedMapFilter]);

  if (!storedFilteredPins) return null;
  const { pins } = storedFilteredPins;

  return (
    <MapWrapper>
      {userLocation && (
        <>
          {creatingNewPin && <Overlay />}
          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
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
          >
            {!creatingNewPin && (
              <>
                <DisplayedPinsMarker pins={pins} setPopupInfo={setPopupInfo} />
                <GeolocateControl
                  position="top-left"
                  trackUserLocation="true"
                  showUserHeading="true"
                />
                <MapFilters
                  showFilterMenu={showFilterMenu}
                  setShowFilterMenu={setShowFilterMenu}
                />

                <InfoPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
              </>
            )}

            {clickedLocation && creatingNewPin && popupIsVisible && (
              <NewPinMarker clickedLocation={clickedLocation} />
            )}
          </Map>
          {mapModalMessage !== "" && <InfoModal message={mapModalMessage} />}
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
