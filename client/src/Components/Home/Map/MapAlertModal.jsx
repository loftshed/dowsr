import styled from "styled-components";
import { SIZES } from "../../../styling/constants";
import { centeredFlexRow } from "../../../styling/sharedstyles";
import { fadeIn } from "../../../styling/animations";

const MapAlertModal = ({ message }) => {
  let style = null;
  if (message === "Creating a new pin") {
    style = {
      outline: "2px solid var(--color-pink)",
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
  background-color: var(--color-dark-grey);
  outline: 1px solid var(--color-super-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
  padding: 1px 10px;
  pointer-events: none;
  animation: ${fadeIn} 0.3s forwards ease;
`;

const InnerContainer = styled.div`
  ${centeredFlexRow}
  font-size: 14px;
  font-weight: 600;
  color: var(--color-medium-grey);
`;
