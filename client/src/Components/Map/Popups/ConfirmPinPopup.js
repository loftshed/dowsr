import styled from "styled-components";
import { Popup } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
} from "../../../Styling/StyledComponents";
import { MappingContext } from "../../../Context/MappingContext";
import { useContext } from "react";

const ConfirmPinPopup = () => {
  const { clickedLocation } = useContext(MappingContext);
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
        {clickedLocation?.lat}, {clickedLocation?.lng}
        <Body>approx street address</Body>
      </PopupContainer>
    </Popup>
  );
};
export default ConfirmPinPopup;

const PopupContainer = styled.div`
  ${centeredFlexColumn}
  color: var(--color-super-dark-grey);
`;

const Heading = styled.div`
  color: var(--color-super-dark-grey);
  font-size: 18px;
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
`;
