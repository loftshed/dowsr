import styled from "styled-components";
import { CenteredFlexColumnDiv, FlexDiv } from "../Styling/StyledComponents";
import { SIZES } from "../Styling/constants";

const AlertModal = ({ children }) => {
  return <ModalWrapper>{children}</ModalWrapper>;
};

export default AlertModal;
const ModalWrapper = styled(FlexDiv)`
  font-weight: 600;
  height: 70px;
  padding: 10px 15px;
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  border: 1px solid var(--color-medium-grey);
  width: 100%;
`;
