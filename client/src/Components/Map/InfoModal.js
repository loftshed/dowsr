import styled from "styled-components";
import { SIZES } from "../../Styling/constants";
import { centeredFlexRow } from "../../Styling/StyledComponents";

const InfoModal = ({ message }) => {
  return (
    <ModalWrapper>
      <InnerContainer>{message}</InnerContainer>
    </ModalWrapper>
  );
};

export default InfoModal;

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
  padding: 5px 10px;
  transition: 0.3s ease all;
`;

const InnerContainer = styled.div`
  ${centeredFlexRow}
  font-weight: 800;
  color: var(--color-medium-grey);
`;
