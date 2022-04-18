import styled, { css } from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
  textButtonstyling,
} from "../../../../styling/sharedstyles";

import { MappingContext } from "../MappingContext";
import { useContext, useEffect, useState } from "react";
import { getDistanceFromPoint } from "../helpers";
import { useNavigate } from "react-router-dom";

import { RiLinkM as LinkIcon } from "react-icons/ri";
import { AppContext } from "../../../../AppContext";
import PinVoting from "./PinVoting";
import PinStreetView from "./PinStreetView";

const PinInfoPopup = () => {
  const navigate = useNavigate();
  const { current: map } = useMap();
  const {
    popupInfo,
    setPopupInfo,
    userLocation,
    setClickedLocation,
    setStoredFilteredPins,
  } = useContext(MappingContext);
  const { loggedInUser } = useContext(AppContext);
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
        <Heading>
          {popupInfo.submittedBy === "dowsr" && popupInfo.site ? (
            <>
              <a href={`${popupInfo.site}`} target="_new">
                {popupInfo.desc}
                <LinkIcon style={{ pointerEvents: "none" }} />
              </a>
            </>
          ) : (
            <>{popupInfo.desc}</>
          )}
        </Heading>
        <Body>
          <Distance>{kmFromUser} km away</Distance>
          <PinStreetView popupInfo={popupInfo} />

          {/* TODO do something to stop button from animation if submitted by dowsr */}

          {popupInfo.submittedBy !== "dowsr" ? (
            <>
              <SubmittedBy
                key="linkToProfile"
                disabled={!popupInfo.submittedBy}
                onClick={(ev) => {
                  navigate(`/profile/${popupInfo.submittedBy}`);
                }}
              >
                <span>Submitted by</span>
                <>{isOwnPin ? <>you!</> : <>@{popupInfo.submittedBy}</>}</>
              </SubmittedBy>
              <PinVoting
                isOwnPin={isOwnPin}
                isDefaultPin={isDefaultPin}
                pinFeedback={pinFeedback}
                setPinFeedback={setPinFeedback}
              />
            </>
          ) : (
            <DefaultPin>
              <span>
                Submitted by <span>dowsr</span>
              </span>
            </DefaultPin>
          )}
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default PinInfoPopup;

const LikeDislike = styled.div`
  gap: 5px;
  display: flex;
`;

const SubmittedBy = styled.button`
  ${textButtonstyling}
  position: relative;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  line-height: 10px;
  background-color: var(--color-less-dark-grey);
  span {
    padding-right: 5px;
    font-size: 0.8rem;
  }
`;

const DefaultPin = styled(SubmittedBy)`
  pointer-events: none;
  span {
    all: unset;
    span {
      color: var(--color-light-grey);
    }
  }
`;

const Heading = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 800;
  color: var(--color-light-grey);
  padding: 3px;
  text-align: center;
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
      color: var(--color-teal);
    }
  }
`;

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
