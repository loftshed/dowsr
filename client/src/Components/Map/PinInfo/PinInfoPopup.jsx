import styled from "styled-components/macro";
import { Popup /*useMap*/ } from "react-map-gl";
import { fillSpace, centeredFlexColumn } from "../../../styling/sharedstyles";

import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import PinVoting from "./components/PinVoting";
import PinStreetView from "./components/PinStreetView";
import PinSubmitter from "./components/PinSubmitter";
import PinInfoHeader from "./components/PinInfoHeader";
import PinDistance from "./components/PinDistance";
import { AppContext } from "../../AppContext";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const PinInfoPopup = () => {
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

const TopPanel = styled.div``;

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
