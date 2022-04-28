import styled from "styled-components/macro";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../styling/sharedstyles";
import { MappingContext } from "../MappingContext";
import { useContext, useEffect } from "react";
import { fadeIn } from "../../../styling/animations";

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
          {clickedLocation.addressShort && (
            <>
              {clickedLocation.addressShort}
              <a
                href={`http://maps.google.com/maps?q=&layer=c&cbll=${clickedLocation?.lat},${clickedLocation?.lng}`}
                target="_new"
              >
                <LoadingFiller />

                <StreetView
                  id="street-view"
                  src={`https://maps.googleapis.com/maps/api/streetview?size=225x125&location=${clickedLocation?.lat},${clickedLocation?.lng}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
                />
              </a>
            </>
          )}
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default NewPinPopup;

const StreetView = styled.img`
  position: absolute;
  top: 0;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.pink};
  width: 225px;
  height: 125px;
  animation: ${fadeIn} 0.5s ease;
`;

const LoadingFiller = styled.div`
  display: flex;
  position: relative;
  min-height: 125px;
  width: 225px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.darkGrey};
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
  padding: 5px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  a {
    position: relative;
  }
`;

const CreateButton = styled(TextButton)`
  font-size: 12px;
  padding: 0px 8px;
  line-height: 15px;
  background-color: ${(props) => props.theme.colors.extraMediumGrey};
  margin: 0px 0px 5px 0px;
`;
