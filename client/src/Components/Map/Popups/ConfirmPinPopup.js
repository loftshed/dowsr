import styled from "styled-components";
import { Popup } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../Styling/StyledComponents";
import { MappingContext } from "../../../Context/MappingContext";
import { useContext, useEffect } from "react";

const ConfirmPinPopup = () => {
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const {
    clickedLocation,
    setShowPinCreationModal,
    setMapModalMessage,
    setClickedLocation,
    setPopupIsVisible,
  } = useContext(MappingContext);

  useEffect(() => {
    return () => {
      setClickedLocation(null);
      console.log("Confirm pin dismounted");
    };
  }, []);

  return (
    <Wrapper>
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
        }}
      >
        <PopupContainer>
          <Body>
            {!clickedLocation.addressShort ? (
              <LoadingFiller />
            ) : (
              <>{clickedLocation.addressShort}</>
            )}

            <CreateButton
              onClick={() => {
                setShowPinCreationModal(true);
              }}
            >
              Create a Pin
            </CreateButton>
            <a
              href={`http://maps.google.com/maps?q=&layer=c&cbll=${clickedLocation?.lat},${clickedLocation?.lng}`}
            >
              <StreetView
                src={`https://maps.googleapis.com/maps/api/streetview?size=200x100&location=${clickedLocation?.lat},${clickedLocation?.lng}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
              />
            </a>
          </Body>
        </PopupContainer>
      </Popup>
    </Wrapper>
  );
};
export default ConfirmPinPopup;

const Wrapper = styled.div``;

const StreetView = styled.img`
  border-radius: 10px;
  border: 2px solid var(--color-pink);
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
    color: var(--color-super-dark-grey);
  }
  padding: none;
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
  color: var(--color-light-grey);
  gap: 5px;
  background-color: var(--color-darkest-grey);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
  outline: 1px solid var(--color-super-dark-grey);
`;

const CreateButton = styled(TextButton)`
  font-size: 12px;
  padding: 3px 8px;
`;
