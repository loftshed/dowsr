import styled from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
} from "../../../../styling/sharedstyles";

import { MappingContext } from "../MappingContext";
import { useContext, useEffect, useState } from "react";
import { getDistanceFromPoint } from "../helpers";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../../AppContext";
import PinVoting from "./components/PinVoting";
import PinStreetView from "./components/PinStreetView";
import PinSubmitter from "./components/PinSubmitter";
import PinInfoHeader from "./components/PinInfoHeader";

const PinInfoPopup = () => {
  const { current: map } = useMap();
  const { loggedInUser } = useContext(AppContext);
  const { popupInfo, setPopupInfo, userLocation, setClickedLocation } =
    useContext(MappingContext);
  const distanceFromUser = getDistanceFromPoint(
    { lat: +popupInfo?.latitude, lng: +popupInfo?.longitude },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const [pinFeedback, setPinFeedback] = useState({});

  const isOwnPin = localStorage.getItem("username") === popupInfo?.submittedBy;
  const isDefaultPin = popupInfo?.submittedBy === null;

  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  useEffect(() => {
    setPinFeedback({
      numLikes: popupInfo?.likedByIds.length,
      numDislikes: popupInfo?.dislikedByIds.length,
    });
    return () => {
      setClickedLocation(null);
    };
  }, [pinFeedback.numLikes, pinFeedback.numDislikes]);

  // Get the user's avatarUrl from the db

  if (!popupInfo) return null;

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
        zIndex: "1",
        padding: "0",
        transition: "all ease 0.2s",
      }}
    >
      <PopupContainer>
        <PinInfoHeader popupInfo={popupInfo} />
        <Body>
          <Distance>{kmFromUser} km away</Distance>
          <PinStreetView popupInfo={popupInfo} />
          <PinSubmitter popupInfo={popupInfo} isOwnPin={isOwnPin} />
          <PinVoting
            isOwnPin={isOwnPin}
            isDefaultPin={isDefaultPin}
            pinFeedback={pinFeedback}
            setPinFeedback={setPinFeedback}
          />
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default PinInfoPopup;

const Distance = styled.div``;

const PopupContainer = styled.div`
  user-select: none;
  ${centeredFlexColumn}
  p, span {
    color: var(--color-super-dark-grey);
  }
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: var(--color-light-grey);
  background-color: var(--color-darkest-grey);
  border-radius: 4px;
  padding: 3px 5px;
  gap: 3px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid var(--color-super-dark-grey);
`;
