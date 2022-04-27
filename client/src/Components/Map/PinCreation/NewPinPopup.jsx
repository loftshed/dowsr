import styled from "styled-components/macro";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../styling/sharedstyles";
import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";

const NewPinPopup = () => {
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const {
    clickedLocation,
    setShowPinCreationModal,
    showPinCreationModal,
    setClickedLocation,
    // setMapModalMessage,
    // setPopupIsVisible,
  } = useContext(MappingContext);

  const { current: map } = useMap();

  useEffect(() => {
    return () => {
      setClickedLocation(null);
    };
  }, [setClickedLocation]);

  return (
    <Popup
      anchor="bottom"
      latitude={clickedLocation?.lat}
      longitude={clickedLocation?.lng}
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
        {!showPinCreationModal && (
          <CreateButton
            onClick={() => {
              setShowPinCreationModal(true);
              const boundingBox = [
                [clickedLocation?.lng + 0.001, clickedLocation?.lat + 0.001],
                [clickedLocation?.lng - 0.001, clickedLocation?.lat - 0.001],
              ];
              map.fitBounds(boundingBox, {
                padding: { bottom: 150 },
              });
            }}
          >
            Create a pin here?
          </CreateButton>
        )}

        <Body>
          {!clickedLocation.addressShort ? (
            <LoadingFiller />
          ) : (
            <>{clickedLocation.addressShort}</>
          )}
          <a
            href={`http://maps.google.com/maps?q=&layer=c&cbll=${clickedLocation?.lat},${clickedLocation?.lng}`}
            target="_new"
          >
            <StreetView
              id="street-view"
              src={`https://maps.googleapis.com/maps/api/streetview?size=200x75&location=${clickedLocation?.lat},${clickedLocation?.lng}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
            />
          </a>
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default NewPinPopup;

const StreetView = styled.img`
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.pink};
`;

const LoadingFiller = styled.div`
  position: relative;
  height: 18px;
  width: 100px;
  border-radius: 4px;
  overflow: hidden;
`;

const PopupContainer = styled.div`
  ${centeredFlexColumn}
  p, span {
    color: ${(props) => props.theme.colors.superDarkGrey};
  }
  padding: none;
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: ${(props) => props.theme.colors.lightGrey};
  gap: 5px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;

const CreateButton = styled(TextButton)`
  font-size: 12px;
  padding: 0px 8px;
  line-height: 15px;
  background-color: ${(props) => props.theme.colors.extraMediumGrey};
  margin: 0px 0px 5px 0px;
`;
