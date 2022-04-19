import styled from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
} from "../../../../styling/sharedstyles";

import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import PinVoting from "./components/PinVoting";
import PinStreetView from "./components/PinStreetView";
import PinSubmitter from "./components/PinSubmitter";
import PinInfoHeader from "./components/PinInfoHeader";
import PinDistance from "./components/PinDistance";

const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const PinInfoPopup = () => {
  const { popupInfo, setPopupInfo, userLocation, setClickedLocation } =
    useContext(MappingContext);
  const { current: map } = useMap();

  const isOwnPin = localStorage.getItem("username") === popupInfo?.submittedBy;

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
      <div>
        <PinInfoHeader popupInfo={popupInfo} />
        <Body>
          <DecorativeContainer>
            <ImageContainer>
              <PinDistance popupInfo={popupInfo} userLocation={userLocation} />
              <PinStreetView
                popupInfo={popupInfo}
                apiKey={REACT_APP_GOOGLE_API_KEY}
              />
            </ImageContainer>
            <ActionContainer>
              <PinVoting isOwnPin={isOwnPin} />
              <PinSubmitter popupInfo={popupInfo} isOwnPin={isOwnPin} />
            </ActionContainer>
          </DecorativeContainer>
        </Body>
      </div>
    </PopupContainer>
  );
};
export default PinInfoPopup;

const ImageContainer = styled.div`
  ${centeredFlexColumn}
  position: relative;
  background-color: var(--color-medium-grey);
  border-radius: 5px;
  gap: 4px;
  width: 100%;
`;

const ActionContainer = styled.div`
  position: relative;
  ${centeredFlexColumn}
  padding: 3px;

  border-radius: 5px;
  gap: 4px;
  width: 100%;
`;

const DecorativeContainer = styled.div`
  ${centeredFlexColumn};
  width: 100%;
  background-color: var(--color-dark-grey);
  border-radius: 10px;
  gap: 5px;
`;

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
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: var(--color-light-grey);
  background-color: var(--color-darkest-grey);

  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid var(--color-super-dark-grey);
`;
