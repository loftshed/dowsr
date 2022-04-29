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
  const { setPopupInfo, popupInfo, setStoredFilteredPins, storedFilteredPins } =
    useContext(MappingContext);
  // const [likedByUser, setLikedByUser] = useState(
  //   pinFeedback.likedByIds.includes(loggedInUser._id)
  // );
  // const [dislikedByUser, setDislikedByUser] = useState(
  //   pinFeedback.dislikedByIds.includes(loggedInUser._id)
  // );

  const [likedByUser, setLikedByUser] = useState(
    popupInfo.likedByIds.includes(loggedInUser._id)
  );
  const [dislikedByUser, setDislikedByUser] = useState(
    popupInfo.dislikedByIds.includes(loggedInUser._id)
  );

  // loooool i am sure there is some way to make this dry as all get out but this took me way too  long i'm doone

  const handleButtonClick = async (ev) => {
    const response = await togglePinLike(
      popupInfo._id,
      loggedInUser._id,
      value === "like" ? true : ""
    );
    console.log("response", response);
    const { success, action } = response;

    if (success) {
      let newPinFeedback = { ...pinFeedback };
      switch (action) {
        case "liked":
          if (dislikedByUser) {
            console.warn("removing dislike");
            newPinFeedback = {
              ...newPinFeedback,
              dislikedByIds: newPinFeedback.dislikedByIds.filter(
                (id) => id !== loggedInUser._id
              ),
            };
            setDislikedByUser(false);
          }
          console.warn("adding like");
          setPinFeedback({
            ...newPinFeedback, // add user to likedByIds in newPinFeedback
            likedByIds: newPinFeedback.likedByIds.concat(loggedInUser._id),
          }); // if user is not in dislikedByIds, return immediately
          setLikedByUser(true);
          break;

        case "unliked":
          // no need to toggle opposite action, so just remove user from likedByIds
          setPinFeedback({
            ...pinFeedback,
            likedByIds: pinFeedback.likedByIds.filter(
              (id) => id !== loggedInUser._id
            ),
          });
          setLikedByUser(false);
          break;

        case "disliked":
          if (likedByUser) {
            console.warn("removing like");
            newPinFeedback = {
              ...newPinFeedback,
              likedByIds: newPinFeedback.likedByIds.filter(
                (id) => id !== loggedInUser._id
              ),
            };
            setLikedByUser(false);
          }
          console.warn("adding dislike");
          setPinFeedback({
            ...newPinFeedback, // add user to dislikedByIds
            dislikedByIds: newPinFeedback.dislikedByIds.concat(
              loggedInUser._id
            ),
          }); // if user is not in likedByIds, return immediately

          setDislikedByUser(true);
          break;

        case "undisliked":
          setPinFeedback({
            ...pinFeedback, // no need to toggle opposite action, so just remove the user from dislikedByIds
            dislikedByIds: pinFeedback.dislikedByIds.filter(
              (id) => id !== loggedInUser._id
            ),
          });
          setDislikedByUser(false);
          break;

        default:
          break;
      }

      const updatedPin = {
        ...popupInfo,
        likedByIds: pinFeedback?.likedByIds,
        dislikedByIds: pinFeedback?.dislikedByIds,
      };

      const pinsMinusPrev = storedFilteredPins.filter((pin) => {
        return pin._id !== popupInfo._id;
      });

      console.log(popupInfo);

      setStoredFilteredPins([...pinsMinusPrev, updatedPin]);
    }
  };

  console.log(pinFeedback);

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
