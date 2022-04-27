import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl } from "react-map-gl";
import { useContext, useEffect, useRef } from "react";
import { handleGetPinsOfType } from "./helpers";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import styled from "styled-components/macro";
import MapFilters from "./MapFilters";
import MapAlertModal from "./MapAlertModal";
import PinInfoPopup from "./PinInfo/PinInfoPopup";
import PinInfoMarker from "./PinInfo/components/PinInfoMarker";
import { MappingContext } from "./MappingContext";
import NewPinMarker from "./PinCreation/NewPinMarker";
import { MAPBOX_API_KEY, reverseGeocode } from "./helpers";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const MapContainer = () => {
  const { firstLogin } = useContext(AppContext);
  const navigate = useNavigate();

  if (firstLogin) navigate("/firstlogin");

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

  // Begins the process of creating a new pin. First grabs the street address of the clicked location, then records that location in state as clickedLocation.
  const handleBeginPinCreation = async (ev) => {
    try {
      const locationObj = await reverseGeocode(ev);
      setClickedLocation(locationObj);
    } catch (err) {
      console.log(err);
    }
  };

  //TODO: Try to get this out of the component. So messsy.
  // Uses built in browser geolocation to get the user's current location, then records that location in state as userLocation.
  const handleGeolocateUser = () => {
    return navigator.geolocation.getCurrentPosition((pos) => {
      const {
        coords: { latitude, longitude },
      } = pos;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  };

  // In useEffect ... If creating a new pin, do nothing.
  // If the user has not yet been geolocated, geolocate the user.
  // If no map filter is selected, show water pins by default, otherwise show the selected map filter's pins.
  // If not an admin, store only the pins that are not pending approval.

  useEffect(() => {
    (async () => {
      try {
        if (creatingNewPin) return;
        if (!userLocation) handleGeolocateUser();
        let filter;
        !selectedMapFilter ? (filter = "water") : (filter = selectedMapFilter);
        const retrieved = await handleGetPinsOfType(filter);
        const filteredPins = retrieved.pins.filter((pin) => !pin.pendingReview);
        setStoredFilteredPins(filteredPins);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setUserLocation, selectedMapFilter]);

  // Halts execution until storedFilteredPins are present in state.
  if (!storedFilteredPins) return null;

  return (
    <MapWrapper cursorType={creatingNewPin ? "pointer" : ""}>
      {userLocation && (
        <Wrapper>
          <Content>
            {creatingNewPin && <Overlay />}
            <Map
              mapboxAccessToken={MAPBOX_API_KEY}
              id="map"
              container="map"
              ref={mapRef}
              initialViewState={{
                longitude: userLocation.lng,
                latitude: userLocation.lat,
                zoom: 12,
              }}
              // mapStyle="mapbox://styles/mapbox/dark-v10"
              mapStyle="mapbox://styles/loftshed/cl23j7aoi000915myf03ynn0u"
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
                  <PinInfoMarker
                    pins={storedFilteredPins}
                    setPopupInfo={setPopupInfo}
                  />
                  <GeolocateControl
                    position="top-left"
                    trackUserLocation="true"
                    showUserHeading="true"
                  />
                  <MapFilters
                    showFilterMenu={showFilterMenu}
                    setShowFilterMenu={setShowFilterMenu}
                    setStoredFilteredPins={setStoredFilteredPins}
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
            {mapModalMessage !== "" && (
              <MapAlertModal message={mapModalMessage} />
            )}
          </Content>
        </Wrapper>
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
  background-color: ${(props) => props.theme.colors.pink};
  ${fillSpace}
  z-index: 1;
  opacity: 15%;
  box-shadow: inset 0px 0px 1000px ${(props) => props.theme.colors.teal};
  pointer-events: none;
`;

// from home.jsx
const Wrapper = styled.div`
  ${fillSpace}
  background-color: ${(props) => props.theme.colors.darkGrey};
  width: 100%;
  h1 {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  }
`;

const Content = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
`;
