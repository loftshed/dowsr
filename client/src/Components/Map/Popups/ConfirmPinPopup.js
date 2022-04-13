import styled from "styled-components";
import { Popup } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
} from "../../../Styling/StyledComponents";

const ConfirmPinPopup = ({ clickedLocation }) => {
  return (
    <Popup
      anchor="top"
      longitude={clickedLocation.longitude}
      latitude={clickedLocation.latitude}
      closeOnClick={false}
      maxWidth={"350px"}
      // onClose={() => setPopupInfo(null)}
    >
      <PopupContainer>
        <Heading>coordinates go here</Heading>
        <Body>approx street address</Body>
      </PopupContainer>
    </Popup>
  );
};
export default ConfirmPinPopup;

const PopupContainer = styled.div`
  user-select: none;
  ${centeredFlexColumn}
  a {
    color: var(--color-super-dark-grey);
  }
`;

const Heading = styled.div`
  h3 {
    color: var(--color-super-dark-grey);
    font-size: 18px;
  }
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
`;
