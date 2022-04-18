import MessageButton from "./MessageButton";
import FollowButton from "./FollowButton";
import FollowCounts from "./FollowCounts";
import styled, { css } from "styled-components";
import { sharedDetailStyle } from "./sharedstyles";
import { textButtonstyling } from "../../styling/sharedstyles";
import { useState } from "react";

const ActionBar = ({
  loggedInUser,
  _id,
  viewedProfile,
  isOwnProfile,
  following,
}) => {
  const [followingState, setFollowingState] = useState(
    viewedProfile.following.length
  );
  const [followerCount, setFollowerCount] = useState(
    viewedProfile.followers.length
  );
  const [followingCount, setFollowingCount] = useState(
    viewedProfile.followers.length
  );
  return (
    <>
      {!isOwnProfile && (
        <ActionBarWrapper>
          <FollowButton
            loggedInUser={loggedInUser}
            _id={_id}
            followingState={followingState}
            setFollowingState={setFollowingState}
            setFollowerCount={setFollowerCount}
            setFollowingCount={setFollowingCount}
            followerCount={followerCount}
          />
          <MessageButton loggedInUser={loggedInUser} _id={_id} />
        </ActionBarWrapper>
      )}
      <FollowCounts
        followerCount={followerCount}
        followingCount={followingCount}
      />
    </>
  );
};

export { ActionBar, buttonStyle };

const ActionBarWrapper = styled.div`
  justify-content: space-between;
  ${sharedDetailStyle}
`;

const buttonStyle = css`
  ${textButtonstyling}
  border-radius: 3px;
  cursor: pointer;
`;
