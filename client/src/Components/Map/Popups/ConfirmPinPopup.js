import styled from "styled-components";
import { Popup } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
  TextButton,
} from "../../../Styling/StyledComponents";
import { MappingContext } from "../../../Context/MappingContext";
import { useContext } from "react";

const ConfirmPinPopup = () => {
  const { clickedLocation, showNewPinModal } = useContext(MappingContext);
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
        <span>This Location:</span>
        <p>lat: {clickedLocation?.lat}</p>
        <p>lon: {clickedLocation?.lng}</p>
        <Body>approx street address</Body>
        <CreateButton>Create a Pin</CreateButton>
      </PopupContainer>
    </Popup>
  );
};
export default ConfirmPinPopup;

const CreateButton = styled(TextButton)`
  padding: 3px 5px;
`;

const PopupContainer = styled.div`
  ${centeredFlexColumn}
  p, span {
    color: var(--color-super-dark-grey);
  } ;
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
`;
