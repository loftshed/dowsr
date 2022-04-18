import { useState } from "react";
import styled from "styled-components";
import { handleToggleFollow } from "./helpers";
import {
  RiUserFollowLine as FollowIcon,
  RiUserUnfollowLine as UnfollowIcon,
} from "react-icons/ri";
import { BsFillCheckCircleFill as CheckIcon } from "react-icons/bs";
import { TextButton } from "../../styling/sharedstyles";

const FollowButton = ({
  loggedInUser,
  _id,
  followingState,
  setFollowingState,
}) => {
  const [hover, setHover] = useState(false);
  // Follows or unfollows user.

  return (
    <FollowButtonWrapper
      onClick={async () => {
        if (!followingState) {
          handleToggleFollow(loggedInUser._id, _id, true);
          setFollowingState(true);
          return;
        }
        if (followingState) {
          handleToggleFollow(loggedInUser._id, _id);
          setFollowingState(false);
          return;
        }
      }}
      onMouseEnter={(ev) => setHover(true)}
      onMouseLeave={(ev) => setHover(false)}
    >
      {followingState ? (
        <>
          {hover ? (
            <>
              <UnfollowIcon style={{ display: "inline" }} />
              <span>Unfollow?</span>
            </>
          ) : (
            <>
              <CheckIcon style={{ display: "inline" }} />
              <span>{"Following"}</span>
            </>
          )}
        </>
      ) : (
        <>
          <FollowIcon style={{ display: "inline" }} />
          <span>{"Follow"}</span>
        </>
      )}
    </FollowButtonWrapper>
  );
};

export default FollowButton;

const FollowButtonWrapper = styled(TextButton)`
  border-radius: 3px;
  padding: 0px 5px;
  cursor: pointer;
  gap: 3px;
`;
