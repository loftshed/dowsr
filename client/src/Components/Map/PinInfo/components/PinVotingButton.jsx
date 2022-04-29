import styled, { css } from "styled-components/macro";
import { centeredFlexRow } from "../../../../styling/sharedstyles";
import { useContext, useEffect, useState } from "react";
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
  const { popupInfo, setStoredFilteredPins, storedFilteredPins } =
    useContext(MappingContext);
  const [likedByUser, setlikedByUser] = useState(
    pinFeedback.likedByIds.includes(loggedInUser._id)
  );
  const [dislikedByUser, setDislikedByUser] = useState(
    pinFeedback.dislikedByIds.includes(loggedInUser._id)
  );
  // const updatedPin = {
  //   ...popupInfo,
  //   likedByIds: pinFeedback.likedByIds,
  //   dislikedByIds: pinFeedback.dislikedByIds,
  // };
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
        setlikedByUser(true);

        if (!dislikedByUser) return;
        // otherwise, continue and remove user from dislikedByIds
        setPinFeedback({
          ...pinFeedback,
          dislikedByIds: pinFeedback.dislikedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        setDislikedByUser(false);
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
        setlikedByUser(false);
        return;
      }

      if (action === "disliked") {
        setPinFeedback({
          ...pinFeedback, // add user to dislikedByIds
          dislikedByIds: pinFeedback.dislikedByIds.concat(loggedInUser._id),
        }); // if user is not in likedByIds, return immediately
        setDislikedByUser(true);
        if (!likedByUser) return;
        // otherwise, continue and remove user from likedByIds
        setPinFeedback({
          ...pinFeedback,
          likedByIds: pinFeedback.likedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        setlikedByUser(false);
        return;
      }

      if (action === "undisliked") {
        setPinFeedback({
          ...pinFeedback, // no need to toggle opposite action, so just remove the user from dislikedByIds
          dislikedByIds: pinFeedback.dislikedByIds.filter(
            (id) => id !== loggedInUser._id
          ),
        });
        setDislikedByUser(false);
        return;
      }

      const updatedPin = {
        ...popupInfo,
        likedByIds: pinFeedback.likedByIds,
        dislikedByIds: pinFeedback.dislikedByIds,
      };
      const pinsMinusPrev = storedFilteredPins.filter((pin) => {
        return pin._id !== popupInfo._id;
      });
      setStoredFilteredPins([...pinsMinusPrev, updatedPin]);
      console.log("executing ja");
    }
  };

  return (
    <PinVotingButtonWrapper
      likedByUser={pinFeedback.likedByIds.includes(loggedInUser._id)}
      dislikedByUser={pinFeedback.dislikedByIds.includes(loggedInUser._id)}
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
            filter: brightness(1.1);
            outline: 1px solid ${(props) => props.theme.colors.pink};
          }
          &:active {
            background-color: ${(props) => props.theme.colors.darkTeal};
          }
        `
      : css`
          background-color: ${(props) => props.theme.colors.pink};
          &:hover {
            filter: brightness(1.1);
            outline: 1px solid ${(props) => props.theme.colors.teal};
          }
          &:active {
            background-color: ${(props) => props.theme.colors.duskyPink};
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
    
  ${(props) =>
    props.likedByUser &&
    props.value === "like" &&
    css`
      background-color: ${(props) => props.theme.colors.darkGrey};
      span {
        color: ${(props) => props.theme.colors.lightGrey} !important;
        text-shadow: 1px 1px 0px ${(props) => props.theme.colors.pink};
      }
      svg {
        fill: ${(props) => props.theme.colors.lightGrey} !important;
        stroke-width: 1px solid;
        stroke: ${(props) => props.theme.colors.pink} !important;
      }
    `}

    ${(props) =>
    props.dislikedByUser &&
    props.value === "dislike" &&
    css`
      background-color: ${(props) => props.theme.colors.darkGrey};
      span {
        color: ${(props) => props.theme.colors.lightGrey} !important;
        text-shadow: 1px 1px 0px ${(props) => props.theme.colors.teal};
      }
      svg {
        fill: ${(props) => props.theme.colors.lightGrey} !important;
        stroke-width: 1px solid;
        stroke: ${(props) => props.theme.colors.teal} !important;
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
