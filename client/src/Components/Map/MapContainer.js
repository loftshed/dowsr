import Map, { Marker, Popup, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { getUserLocation, handleGetPinsOfType } from "../helpers/mapHelpers";
import { centeredFlexColumn, fillSpace } from "../../Styling/StyledComponents";
import styled, { css } from "styled-components";
import MapFilters from "./MapFilters";
import InfoModal from "./Modals/InfoModal";
import InfoPopup from "./Popups/InfoPopup";
import DisplayedPinsMarker from "./Markers/DisplayedPinsMarker";
import { MappingContext } from "../../Context/MappingContext";
import NewPinMarker from "./Markers/NewPinMarker";

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

/*
//TODO: CREATE MAP PIN. 
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
    setShowNewPinModal,
    showNewPinModal,
    popupInfo,
    setPopupInfo,
  } = useContext(MappingContext);
  const { setCreatingNewPin, creatingNewPin } = useContext(MappingContext);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [filteredPins, setFilteredPins] = useState(null);

  const handleCreateNewPin = (ev) => {
    setClickedLocation(ev.lngLat); // record location in state
    setShowNewPinModal(true); // show the pin creation modal
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
            style={{
              width: "100%",
              height: "100%",
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
            <GeolocateControl position="top-left" />
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
`;
