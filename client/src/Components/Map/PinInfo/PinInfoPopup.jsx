import styled from "styled-components/macro";
import { Popup /*useMap*/ } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  centeredFlexRow,
} from "../../../styling/sharedstyles";

import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import PinVoting from "./components/PinVoting";
import PinStreetView from "./components/PinStreetView";
import PinSubmitter from "./components/PinSubmitter";
import PinInfoHeader from "./components/PinInfoHeader";
import PinDistance from "./components/PinDistance";
import { AppContext } from "../../AppContext";
import dayjs from "dayjs";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const PinInfoPopup = () => {
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  const { popupInfo, setPopupInfo, userLocation, setClickedLocation } =
    useContext(MappingContext);
  // const { current: map } = useMap();
  const { loggedInUser } = useContext(AppContext);

  const isOwnPin = loggedInUser.username === popupInfo?.submittedBy;

  useEffect(() => {
    return () => {
      setClickedLocation(null);
    };
  }, []);

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
      <PinInfo>
        <TopPanel>
          <PinInfoHeader popupInfo={popupInfo} />

          <ImageContainer>
            <PinDistance popupInfo={popupInfo} userLocation={userLocation} />
            <PinStreetView
              popupInfo={popupInfo}
              apiKey={REACT_APP_GOOGLE_API_KEY}
            />
            {(popupInfo.type === "water" || popupInfo.type === "toilet") && (
              <Hours>Open {popupInfo.hours}</Hours>
            )}
            {(popupInfo.type === "police" || popupInfo.type === "hazard") && (
              <Hours>{dayjs(popupInfo.hours).fromNow()}</Hours>
            )}
          </ImageContainer>
        </TopPanel>
        <Body>
          <ActionContainer>
            <PinVoting isOwnPin={isOwnPin} />
            <PinSubmitter popupInfo={popupInfo} isOwnPin={isOwnPin} />
          </ActionContainer>
        </Body>
      </PinInfo>
    </PopupContainer>
  );
};
export default PinInfoPopup;

const Hours = styled.div`
  bottom: 5px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  position: absolute;
  z-index: 1;
  ${centeredFlexRow}
  gap: 2px;
  line-height: 1.3;

  /* position: absolute;
  bottom: 2px;
  display: flex;
  justify-content: center;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.superDarkGrey};
  padding: 1px 5px;
  margin-top: -4px;
  margin-bottom: 4px;
  border-radius: 100px;
  line-height: 1; */
`;

const TopPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PinInfo = styled.div`
  ${centeredFlexColumn}
  gap: 6px;
`;

const ImageContainer = styled.div`
  ${centeredFlexColumn}
  position: relative;
  background-color: ${(props) => props.theme.colors.mediumGrey};
  border-radius: 5px;
  gap: 4px;
  width: 100%;
`;

const ActionContainer = styled.div`
  position: relative;
  ${centeredFlexColumn}
  padding: 2px;
  border-radius: 5px;
  gap: 2px;
  width: 100%;
`;

const PopupContainer = styled(Popup)`
  position: relative;
  z-index: 1;
  padding: 0;
  transition: all ease 0.2s;
  user-select: none;
  p,
  span {
    color: ${(props) => props.theme.colors.superDarkGrey};
  }
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: ${(props) => props.theme.colors.lightGrey};
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;
