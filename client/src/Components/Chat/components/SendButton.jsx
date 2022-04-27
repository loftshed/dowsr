import styled from "styled-components";
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
  background-color: ${(props) => props.theme.colors.darkestGrey};
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
    background-color: ${(props) => props.theme.colors.teal};
    svg {
      fill: ${(props) => props.theme.colors.pink};
      stroke: ${(props) => props.theme.colors.superDarkGrey};
    }
  }
  &:active {
    background-color: ${(props) => props.theme.colors.pink};
    /* transform: scale(0.95); */
    svg {
      transition: all 0.5s ease;
      fill: ${(props) => props.theme.colors.teal};
      transform: translateX(40px);
    }
  }
  overflow: hidden;
`;
