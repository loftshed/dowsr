import styled, { css } from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../../../../AppContext";
import { MappingContext } from "../../MappingContext";
import { togglePinLike } from "../../helpers";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "../../../../../styling/react-icons";
import { textButtonstyling } from "../../../../../styling/sharedstyles";

const PinVoting = ({ isOwnPin, isDefaultPin, pinFeedback, setPinFeedback }) => {
  const { loggedInUser } = useContext(AppContext);
  const { popupInfo } = useContext(MappingContext);

  return (
    <PinVotingWrapper>
      <Button
        isOwnPin={isOwnPin}
        value={"like"}
        onClick={async (ev) => {
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
        }}
      >
        <ThumbsUpIcon />
        <span>{pinFeedback?.numLikes}</span>
      </Button>
      <Button
        isDefaultPin={isDefaultPin}
        isOwnPin={isOwnPin}
        value={"dislike"}
        onClick={async (ev) => {
          const { success, action } = await togglePinLike(
            popupInfo._id,
            loggedInUser._id
          );
          if (success) {
            setPinFeedback({
              ...pinFeedback,
              numDislikes:
                action === "disliked"
                  ? (pinFeedback.numDislikes += 1)
                  : (pinFeedback.numDislikes -= 1),
            });
          }
        }}
      >
        <ThumbsDownIcon />
        <span>{pinFeedback?.numDislikes}</span>
      </Button>
    </PinVotingWrapper>
  );
};
export default PinVoting;

const PinVotingWrapper = styled.div`
  gap: 5px;
  display: flex;
`;
const Button = styled.button`
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
