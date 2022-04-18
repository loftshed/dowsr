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
import PinDistance from "./components/PinDistance";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const PinInfoPopup = () => {
  const { popupInfo, setPopupInfo, userLocation, setClickedLocation } =
    useContext(MappingContext);
  const [pinFeedback, setPinFeedback] = useState({});
  const { current: map } = useMap();

  const isOwnPin = localStorage.getItem("username") === popupInfo?.submittedBy;
  const isDefaultPin = popupInfo?.submittedBy === null;

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
    <PopupContainer
      anchor="bottom"
      latitude={popupInfo.latitude}
      longitude={popupInfo.longitude}
      onClose={() => setPopupInfo(null)}
      closeOnClick={true}
      closeButton={false}
    >
      <div>
        <PinInfoHeader popupInfo={popupInfo} />
        <Body>
          <PinDistance popupInfo={popupInfo} userLocation={userLocation} />
          <PinStreetView
            popupInfo={popupInfo}
            apiKey={REACT_APP_GOOGLE_API_KEY}
          />
          <PinSubmitter popupInfo={popupInfo} isOwnPin={isOwnPin} />
          <PinVoting
            isOwnPin={isOwnPin}
            isDefaultPin={isDefaultPin}
            pinFeedback={pinFeedback}
            setPinFeedback={setPinFeedback}
          />
        </Body>
      </div>
    </PopupContainer>
  );
};
export default PinInfoPopup;

const PopupContainer = styled(Popup)`
  position: relative;
  z-index: 1;
  padding: 0;
  transition: all ease 0.2s;
  user-select: none;
  p,
  span {
    color: var(--color-super-dark-grey);
  }
  div {
    ${centeredFlexColumn}
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
