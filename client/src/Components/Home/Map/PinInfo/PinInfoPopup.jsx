import styled from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
  textButtonstyling,
} from "../../../../styling/sharedstyles";
import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import { getDistanceFromPoint } from "../helpers";
import { useNavigate } from "react-router-dom";

const PinInfoPopup = () => {
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const navigate = useNavigate();
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
        <Heading>{popupInfo.desc}</Heading>
        <Body>
          <Distance>{kmFromUser} km away</Distance>
          <a
            href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo.latitude},${popupInfo.longitude}`}
            target="_new"
          >
            <StreetView
              id="street-view"
              src={`https://maps.googleapis.com/maps/api/streetview?size=200x75&location=${popupInfo.latitude},${popupInfo.longitude}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
            />
          </a>

          {/* TODO do something to stop button from animation if submitted by dowsr */}
          <SubmittedBy
            key="linkToProfile"
            disabled={!popupInfo.submittedBy}
            onClick={(ev) => {
              navigate(`/profile/${popupInfo.submittedBy}`);
            }}
          >
            {popupInfo.submittedBy ? (
              <>
                <span>Submitted by</span>@{popupInfo.submittedBy}
              </>
            ) : (
              <>
                <span>Submitted by</span>dowsr
              </>
            )}
          </SubmittedBy>
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default PinInfoPopup;

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

const Heading = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--color-light-grey);
  padding: 3px;
  text-align: center;
`;

const Distance = styled.div`
  padding: 3px;
`;

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
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: var(--color-light-grey);
  background-color: var(--color-darkest-grey);
  border-radius: 4px;
  padding: 0px 5px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid var(--color-super-dark-grey);
`;
