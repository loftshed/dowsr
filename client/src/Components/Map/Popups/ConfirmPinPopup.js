import styled from "styled-components";
import { Popup } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../Styling/StyledComponents";
import { MappingContext } from "../../../Context/MappingContext";
import { useContext } from "react";
import { RefreshAnim } from "../../../Styling/Animations";

const ConfirmPinPopup = () => {
  const { clickedLocation, setShowPinCreationModal } =
    useContext(MappingContext);
  return (
    <Popup
      anchor="bottom"
      longitude={clickedLocation?.lng}
      latitude={clickedLocation?.lat}
      closeOnClick={false}
      maxWidth={"350px"}
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
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default ConfirmPinPopup;

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
