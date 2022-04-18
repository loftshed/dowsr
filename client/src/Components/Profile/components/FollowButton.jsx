import { useState } from "react";
import styled from "styled-components";
import { handleToggleFollow } from "../helpers";
import {
  RiUserFollowLine as FollowIcon,
  RiUserUnfollowLine as UnfollowIcon,
} from "react-icons/ri";
import { BsFillCheckCircleFill as CheckIcon } from "react-icons/bs";
import { TextButton } from "../../../styling/sharedstyles";
import { ProfileButton } from "../sharedstyles";

// TODO: After follow, first show "following!" confirmation and disable button until hover is false.

const FollowButton = ({
  loggedInUser,
  _id,
  followingState,
  setFollowingState,
  setFollowerCount,
  followerCount,
}) => {
  const [hover, setHover] = useState(false);
  // Follows or unfollows user.
  // setFollowerCount(followerCount += 1);
  return (
    <FollowButtonWrapper
      onClick={async () => {
        if (!followingState) {
          const result = handleToggleFollow(loggedInUser._id, _id, true);
          setFollowingState(true);
          if (!result.unmodified) setFollowerCount(followerCount + 1);
          return;
        }
        if (followingState) {
          const result = handleToggleFollow(loggedInUser._id, _id);
          setFollowingState(false);
          if (!result.unmodified) setFollowerCount(followerCount - 1);
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
              <Text>Unfollow?</Text>
              <UnfollowIcon style={{ display: "inline" }} />
            </>
          ) : (
            <>
              <Text>{"Following"}</Text>
              <CheckIcon style={{ display: "inline" }} />
            </>
          )}
        </>
      ) : (
        <>
          <Text>{"Follow"}</Text>
          <FollowIcon style={{ display: "inline" }} />
        </>
      )}
    </FollowButtonWrapper>
  );
};

export default FollowButton;

const FollowButtonWrapper = styled(ProfileButton)``;
const Text = styled.div``;
