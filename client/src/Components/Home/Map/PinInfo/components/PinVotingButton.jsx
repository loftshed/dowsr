import styled, { css } from "styled-components";
import { textButtonstyling } from "../../../../../styling/sharedstyles";
import { useContext } from "react";
import { AppContext } from "../../../../../AppContext";
import { MappingContext } from "../../MappingContext";
import { togglePinLike } from "../../helpers";

const PinVotingButton = ({
  isOwnPin,
  value,
  setPinFeedback,
  pinFeedback,
  children,
}) => {
  const { loggedInUser } = useContext(AppContext);
  const { popupInfo } = useContext(MappingContext);

  const handleButtonClick = async (ev) => {
    const { success, action } = await togglePinLike(
      popupInfo._id,
      loggedInUser._id,
      true
    );

    if (success) {
      setPinFeedback({
        ...pinFeedback,
        numLikes:
          action === "liked"
            ? pinFeedback.numLikes + 1
            : pinFeedback.numLikes - 1,
      });
    }
  };

  return (
    <PinVotingButtonWrapper
      isOwnPin={isOwnPin}
      value={value}
      onClick={(ev) => {
        console.log(ev);
        handleButtonClick();
      }}
    >
      {children}
    </PinVotingButtonWrapper>
  );
};

export default PinVotingButton;

const PinVotingButtonWrapper = styled.button`
  ${textButtonstyling}
  display: flex;
  align-items: center;
  gap: 2px;
  // if value is like, set background color to teal
  ${(props) =>
    props.value === "like"
      ? css`
          background-color: var(--color-teal);
          &:hover {
            background-color: var(--color-pink);
          }
        `
      : css`
          background-color: var(--color-pink);
        `}
  ${(props) =>
    props.isOwnPin &&
    css`
      pointer-events: none;
    `}        
  padding: 1px 2px;
  border-radius: 4px;
  svg,
  span {
    pointer-events: none;
  }
  span {
    font-weight: 800;
    color: var(--color-medium-grey);
    border-radius: 4px;
    line-height: 11px;
    padding: 2px;
  }
`;
