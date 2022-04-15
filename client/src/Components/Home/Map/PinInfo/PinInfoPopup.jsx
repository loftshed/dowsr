import styled from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../../styling/sharedstyles";
import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import { getDistanceFromPoint } from "../helpers";

const PinInfoPopup = () => {
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const { current: map } = useMap();
  const {
    popupInfo,
    setPopupInfo,
    userLocation,
    setClickedLocation,
    setStoredFilteredPins,
  } = useContext(MappingContext);
  const distanceFromUser = getDistanceFromPoint(
    { lat: +popupInfo?.latitude, lng: +popupInfo?.longitude },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  useEffect(() => {
    return () => {
      setClickedLocation(null);
    };
  }, []);

  if (!popupInfo) return null;
  console.log(popupInfo);

  return (
    <Popup
      anchor="bottom"
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude}
      onClose={() => setPopupInfo(null)}
      closeOnClick={true}
      closeButton={false}
      style={{
        position: "relative",
        zIndex: "5",
        padding: "0",
        transition: "all ease 0.2s",
      }}
    >
      <PopupContainer>
        <Heading>{popupInfo.desc}</Heading>
        <Body>
          <a
            href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo.latitude},${popupInfo.longitude}`}
            target="_new"
          >
            <StreetView
              id="street-view"
              src={`https://maps.googleapis.com/maps/api/streetview?size=200x75&location=${popupInfo.latitude},${popupInfo.longitude}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
            />
          </a>
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default PinInfoPopup;

const Heading = styled.div`
pa`;

const StreetView = styled.img`
  border-radius: 10px;
  border: 2px solid var(--color-pink);
`;

const PopupContainer = styled.div`
  user-select: none;
  ${centeredFlexColumn}
  p, span {
    color: var(--color-super-dark-grey);
  }
  padding: none;
  gap: ;
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: var(--color-light-grey);
  gap: 5px;
  background-color: var(--color-darkest-grey);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid var(--color-super-dark-grey);
`;
