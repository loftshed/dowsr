import styled from "styled-components";
import { Popup } from "react-map-gl";
import { fillSpace, centeredFlexColumn } from "../../../Styling/sharedstyles";
import { useContext, useEffect } from "react";
import { MappingContext } from "../MappingContext";
import { getDistanceFromPoint } from "../helpers";

const InfoPopup = ({ popupInfo, setPopupInfo }) => {
  const { userLocation } = useContext(MappingContext);

  if (!popupInfo) return null;

  const distanceFromUser = getDistanceFromPoint(
    { lat: +popupInfo.latitude, lng: +popupInfo.longitude },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  return (
    <Popup
      anchor="top"
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      closeOnClick={true}
      onClose={() => setPopupInfo(null)}
      maxWidth={"350px"}
    >
      <PopupContainer>
        <Heading>
          <h3>{popupInfo.name}</h3>
        </Heading>
        <Body>
          <span>({kmFromUser}km away)</span>
          <a target="_new" href={popupInfo.site}>
            Website
          </a>
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default InfoPopup;

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
