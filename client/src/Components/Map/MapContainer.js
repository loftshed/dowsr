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

  const handleCreateNewPin = (ev) => {
    setClickedLocation(ev.lngLat); // record location in state
    (async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${ev.lngLat.lng},${ev.lngLat.lat}.json?access_token=${MAPBOX_API_KEY}`
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        const { center, place_name } = jsonResponse.features[0];
        const addressShort = place_name.split(",")[0];
        const locationObj = {
          lat: center[1],
          lng: center[0],
          addressShort: addressShort,
          addressFull: place_name,
        };
        setClickedLocation(locationObj);
      } catch (err) {
        console.log(err);
      }
    })();
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
