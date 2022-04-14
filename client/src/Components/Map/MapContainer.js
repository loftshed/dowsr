import Map, { Marker, Popup, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import {
  getUserLocation,
  handleGetPinsOfType,
  handleSubmitPin,
} from "./mapHelpers";
import { centeredFlexColumn, fillSpace } from "../../Styling/StyledComponents";
import styled, { css } from "styled-components";
import MapFilters from "./MapFilters";
import InfoModal from "./Modals/InfoModal";
import InfoPopup from "./Popups/InfoPopup";
import DisplayedPinsMarker from "./Markers/DisplayedPinsMarker";
import { MappingContext } from "../../Context/MappingContext";
import NewPinMarker from "./Markers/NewPinMarker";
import { MAPBOX_API_KEY, reverseGeocode } from "./mapHelpers";

/*
//TODO: FIGURE OUT WHY POPUPS NO LONGER REAPPEAR AFTER CLOSED >:(
//TODO: WHEN CLICKING A MAP PIN, IT SHOULD SHOW DISTANCE FROM USER
- user selects a point on the map, that point is saved in state
- a modal should pop up asking the user to describe the point
- the point is pushed to an array of datapoints which are used to populate the map with markers.
STRETCH: when the user submits the map pin, it is pushed into an array for review.
STRETCH: submitted pins can be screened and pushed to a final array in an admin backoffice
STRETCH: LOAD MAP POINTS BASED ON DISTANCE RANGE IN VIEWPORT

so much useful things here:
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
    popupInfo,
    setPopupInfo,
    clickedLocation,
    setClickedLocation,
    setCreatingNewPin,
    creatingNewPin,
    setPopupIsVisible,
    popupIsVisible,
  } = useContext(MappingContext);

  const [storedFilteredPins, setStoredFilteredPins] = useState(null);

  const handleBeginPinCreation = async (ev) => {
    try {
      const locationObj = await reverseGeocode(ev);
      setClickedLocation(locationObj);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      if (creatingNewPin) return;
      setUserLocation(await getUserLocation());
      if (!selectedMapFilter) {
        setStoredFilteredPins(await handleGetPinsOfType("bike-shops"));
        return;
      } // for now, just load bike shops if no filter selected
      setStoredFilteredPins(await handleGetPinsOfType(selectedMapFilter));
    })();
  }, [popupInfo, setUserLocation, selectedMapFilter, clickedLocation]);

  if (!storedFilteredPins) return null;
  const { pins } = storedFilteredPins;

  console.log(popupIsVisible);

  return (
    <MapWrapper>
      {userLocation && (
        <>
          {creatingNewPin && <Overlay />}

          <Map
            mapboxAccessToken={MAPBOX_API_KEY}
            initialViewState={{
              longitude: userLocation.lon,
              latitude: userLocation.lat,
              zoom: 12,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            logoPosition={"top-right"}
            dragRotate={false}
            touchZoomRotate={false}
            onClick={(ev) => {
              if (creatingNewPin) {
                handleBeginPinCreation(ev);
                setPopupIsVisible(!popupIsVisible);
                console.log("popup is visible: true");
              }
            }}
          >
            {!creatingNewPin && (
              <>
                <DisplayedPinsMarker pins={pins} />
                <GeolocateControl
                  position="top-left"
                  trackUserLocation="true"
                  showUserHeading="true"
                />
                <MapFilters
                  showFilterMenu={showFilterMenu}
                  setShowFilterMenu={setShowFilterMenu}
                />
              </>
            )}
            {popupInfo && <InfoPopup popupInfo={popupInfo} />}
            {clickedLocation && creatingNewPin && popupIsVisible && (
              // TODO: this is ok for now but definitely remove clicked location if canceling create new pin
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
