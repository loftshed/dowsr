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
  const REACT_APP_GOOGLE_API_SECRET_KEY =
    process.env.REACT_APP_GOOGLE_API_SECRET_KEY;
  const { clickedLocation, setShowPinCreationModal } =
    useContext(MappingContext);

  useEffect(() => {
    console.log(clickedLocation);
  }, []);

  return (
    <Popup
      anchor="bottom"
      latitude={clickedLocation?.lat}
      longitude={clickedLocation?.lng}
      // closeOnClick={true}
      closeButton={false}
      maxWidth="350px"
      // onClose={() => setPopupInfo(null)}
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
  );
};
export default ConfirmPinPopup;

const StreetView = styled.img`
  border-radius: 10px;
  border: 1px solid var(--color-super-dark-grey);
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
  background-color: var(--color-dark-grey);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
`;

const CreateButton = styled(TextButton)`
  font-size: 12px;
  padding: 3px 8px;
`;
