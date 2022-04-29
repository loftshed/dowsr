import styled from "styled-components/macro";
import { centeredFlexRow } from "../../styling/sharedstyles";
import { fadeIn } from "../../styling/Animations";

const MapAlertModal = ({ message }) => {
  let style = null;
  if (message === "Creating a new pin") {
    style = {
      outline: "2px solid ${(props) => props.theme.colors.pink}",
    };
  }
  return (
    <ModalWrapper style={style}>
      <InnerContainer>{message}</InnerContainer>
    </ModalWrapper>
  );
};

export default MapAlertModal;

const ModalWrapper = styled.div`
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  position: absolute;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.darkGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  padding: 1px 10px;
  pointer-events: none;
  animation: ${fadeIn} 0.3s forwards ease;
`;

const InnerContainer = styled.div`
  ${centeredFlexRow}
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.mediumGrey};
`;
