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
//TODO: CREATE MAP PIN. 
//TODO: WHEN CREATING A PIN, OVERLAY MAP AREA WITH ANOTHER COLOR SO USER KNOWS WAT UP
//TODO: WHEN CLICKING A MAP PIN, IT SHOULD SHOW DISTANCE FROM USER
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
  } = useContext(MappingContext);
  const [filteredPins, setFilteredPins] = useState(null);

  const handleCreateNewPin = async (ev) => {
    try {
      const locationObj = await reverseGeocode(ev);
      setClickedLocation(locationObj);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      setUserLocation(await getUserLocation());
      if (!selectedMapFilter) {
        setFilteredPins(await handleGetPinsOfType("bike-shops"));
        return;
      } // for now, just load bike shops if no filter selected
      setFilteredPins(await handleGetPinsOfType(selectedMapFilter));
    })();
  }, [popupInfo, setUserLocation, selectedMapFilter, clickedLocation]);

  if (!filteredPins) return null;
  const { pins } = filteredPins;

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
            mapStyle="mapbox://styles/mapbox/dark-v10"
            logoPosition={"top-right"}
            onClick={(ev) => {
              if (creatingNewPin) handleCreateNewPin(ev);
            }}
          >
            {!creatingNewPin && <DisplayedPinsMarker pins={pins} />}
            {popupInfo && <InfoPopup popupInfo={popupInfo} />}
            {clickedLocation && creatingNewPin && (
              // TODO: this is ok for now but definitely remove clicked location if canceling create new pin
              <NewPinMarker clickedLocation={clickedLocation} />
            )}
            <GeolocateControl
              position="top-left"
              // positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation="true"
              showUserHeading="true"
            />
          </Map>
          {mapModalMessage !== "" && <InfoModal message={mapModalMessage} />}
          <MapFilters
            showFilterMenu={showFilterMenu}
            setShowFilterMenu={setShowFilterMenu}
          />
        </>
      )}
    </MapWrapper>
  );
};

export default MapContainer;

const MapWrapper = styled.div`
  ${fillSpace}
  overflow: hidden;
`;
