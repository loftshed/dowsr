import styled from "styled-components/macro";
import { SendIcon } from "../../../styling/react-icons";
import { SIZES } from "../../../styling/constants";

const SendButton = () => {
  // Purely for keeping all this styling in one place
  return (
    <SendButtonWrapper>
      <SendIcon />
    </SendButtonWrapper>
  );
};
export default SendButton;

const SendButtonWrapper = styled.button`
  font-weight: 600;
  cursor: pointer;
  color: white;
  background-color: var(--color-darkest-grey);
  width: fit-content;
  border-radius: 5px;
  border: none;
  height: 100%;
  padding: 2px 10px;
  margin: 0px 6px;
  transition: all 0.1s ease;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  svg {
    width: 30px;
    height: 30px;
  }
  &:hover {
    background-color: var(--color-teal);
    svg {
      fill: var(--color-pink);
      stroke: var(--color-super-dark-grey);
    }
  }
  &:active {
    background-color: var(--color-pink);
    /* transform: scale(0.95); */
    svg {
      transition: all 0.5s ease;
      fill: var(--color-teal);
      transform: translateX(40px);
    }
  }
  overflow: hidden;
`;
