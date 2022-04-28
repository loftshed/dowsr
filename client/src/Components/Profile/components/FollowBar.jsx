import FollowButton from "./FollowButton";
import styled, { css } from "styled-components/macro";
import { sharedDetailStyle } from "../sharedstyles";
import { textButtonstyling } from "../../../styling/sharedstyles";
import { useState } from "react";
import FollowCountIndicator from "./FollowCountIndicator";
import { useTheme } from "styled-components/macro";

// STRETCH: To get follower avatars make it so that when you follow someone their avatarUrl and username are saved in your followers arary along with their id.

const FollowBar = ({
  loggedInUser,
  _id,
  viewedProfile,
  setViewedProfile,
  isOwnProfile,
}) => {
  const [followingState, setFollowingState] = useState(
    viewedProfile?.followers?.includes(loggedInUser._id) ? true : false
  );

  const theme = useTheme();

  return (
    <>
      <ActionBarWrapper>
        <FollowCountIndicator
          type={"followers"}
          color={theme.colors.teal}
          count={
            viewedProfile.followers?.length > 0
              ? viewedProfile.followers?.length
              : 0
          }
        />

        {!isOwnProfile && (
          <FollowButton
            loggedInUser={loggedInUser}
            _id={_id}
            followingState={followingState}
            setFollowingState={setFollowingState}
            s
            viewedProfile={viewedProfile}
            setViewedProfile={setViewedProfile}
          />
        )}
      </ActionBarWrapper>
      <Container></Container>
      <ActionBarWrapper>
        <FollowCountIndicator
          type={"following"}
          color={theme.colors.pink}
          count={
            viewedProfile.following?.length > 0
              ? viewedProfile.following?.length
              : 0
          }
        />
      </ActionBarWrapper>
      <Container></Container>
    </>
  );
};

const buttonStyle = css`
  ${textButtonstyling}
  border-radius: 3px;
  cursor: pointer;
`;

export { FollowBar, buttonStyle };

const Container = styled.div`
  padding: 0px ${(props) => props.theme.sizes.universalPadding}px;
  @media (min-width: 450px) {
    padding: 0px ${(props) => props.theme.sizes.universalPadding}px;
  }
`;

const ActionBarWrapper = styled.div`
  justify-content: space-between;
  ${sharedDetailStyle};
`;
