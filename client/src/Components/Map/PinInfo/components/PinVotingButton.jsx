import styled, { css } from "styled-components";
import { centeredFlexRow } from "../../../../styling/sharedstyles";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
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

  // loooool i am sure there is some way to make this dry as all get out but this took me way too  long i'm doone

  const handleButtonClick = async (ev) => {
    const response = await togglePinLike(
      popupInfo._id,
      loggedInUser._id,
      value === "like" ? true : ""
    );
    console.log("response", response);
    const { success, action } = response;
    // if the operation is successful, update the pinFeedback state
    // const isAlreadyDisliked = pinFeedback.dislikedByIds.includes(
    //   loggedInUser._id
    // );
    // const isAlreadyLiked = pinFeedback.likedByIds.includes(loggedInUser._id);

    if (success) {
      if (action === "liked") {
        setPinFeedback({
          ...pinFeedback, // add user to likedByIds in newPinFeedback
          likedByIds: pinFeedback.likedByIds.concat(loggedInUser._id),
        }); // if user is not in dislikedByIds, return immediately
        if (!pinFeedback.dislikedByIds.includes(loggedInUser._id)) return;
        // otherwise, continue and remove user from dislikedByIds
        setPinFeedback({
          ...pinFeedback,
          dislikedByIds: pinFeedback.dislikedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        return;
      }

      if (action === "unliked") {
        // no need to toggle opposite action, so just remove user from likedByIds
        setPinFeedback({
          ...pinFeedback,
          likedByIds: pinFeedback.likedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        return;
      }

      if (action === "disliked") {
        setPinFeedback({
          ...pinFeedback, // add user to dislikedByIds
          dislikedByIds: pinFeedback.dislikedByIds.concat(loggedInUser._id),
        }); // if user is not in likedByIds, return immediately
        if (!pinFeedback.likedByIds.includes(loggedInUser._id)) return;
        // otherwise, continue and remove user from likedByIds
        setPinFeedback({
          ...pinFeedback,
          likedByIds: pinFeedback.likedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        return;
      }

      if (action === "undisliked") {
        setPinFeedback({
          ...pinFeedback, // no need to toggle opposite action, so just remove the user from dislikedByIds
          dislikedByIds: pinFeedback.dislikedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        return;
      }
    }
  };

  return (
    <PinVotingButtonWrapper
      isOwnPin={isOwnPin}
      value={value}
      onClick={(ev) => {
        handleButtonClick();
      }}
    >
      {children}
    </PinVotingButtonWrapper>
  );
};

export default PinVotingButton;

const PinVotingButtonWrapper = styled.button`
  width: 50%;
  ${centeredFlexRow}
  gap: 1px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  cursor: pointer;
  // if value is like, set background color to teal
  ${(props) =>
    props.value === "like"
      ? css`
          background-color: ${(props) => props.theme.colors.teal};
          &:hover {
            background-color: ${(props) => props.theme.colors.pink};
          }
        `
      : css`
          background-color: ${(props) => props.theme.colors.pink};
          &:hover {
            background-color: ${(props) => props.theme.colors.teal};
          }
        `}
  ${(props) =>
    props.isOwnPin &&
    css`
      pointer-events: none;
      span {
        color: ${(props) => props.theme.colors.lightGrey};
      }
    `}        
  padding: 3px;
  border-radius: 4px;
  svg {
    stroke: ${(props) => props.theme.colors.extraMediumGrey};
    stroke-width: 1px;
    filter: drop-shadow(
      1px 1px 0px ${(props) => props.theme.colors.superDarkGrey}
    );
  }
  svg,
  span {
    pointer-events: none;
  }
`;
