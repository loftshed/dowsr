import FollowButton from "./FollowButton";
import styled, { css } from "styled-components";
import { sharedDetailStyle } from "../sharedstyles";
import { textButtonstyling } from "../../../styling/sharedstyles";
import { useState } from "react";
import FollowCountIndicator from "./FollowCountIndicator";
import { getUser } from "../../Auth/helpers";

// STRETCH: To get follower avatars make it so that when you follow someone their avatarUrl and username are saved in your followers arary along with their id.

const FollowBar = ({
  loggedInUser,
  _id,
  viewedProfile,
  isOwnProfile,
  following,
}) => {
  const [followingState, setFollowingState] = useState(
    viewedProfile.following?.length
  );
  const [followerCount, setFollowerCount] = useState(
    viewedProfile.followers?.length
  );
  const [followingCount, setFollowingCount] = useState(
    viewedProfile.following?.length
  );

  return (
    <>
      <ActionBarWrapper>
        <FollowCountIndicator
          type={"followers"}
          color={"var(--color-teal)"}
          count={followerCount}
        />

        {!isOwnProfile && (
          <FollowButton
            loggedInUser={loggedInUser}
            _id={_id}
            followingState={followingState}
            setFollowingState={setFollowingState}
            s
            setFollowerCount={setFollowerCount}
            setFollowingCount={setFollowingCount}
            followerCount={followerCount}
          />
        )}
      </ActionBarWrapper>
      bla bla bla
      <ActionBarWrapper>
        <FollowCountIndicator
          type={"following"}
          color={"var(--color-pink)"}
          count={followingCount}
        />
      </ActionBarWrapper>
      so on & so forth
    </>
  );
};

export { FollowBar, buttonStyle };

const ActionBarWrapper = styled.div`
  justify-content: space-between;
  ${sharedDetailStyle};
`;

const buttonStyle = css`
  ${textButtonstyling}
  border-radius: 3px;
  cursor: pointer;
`;
