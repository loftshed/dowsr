import MessageButton from "./MessageButton";
import FollowButton from "./FollowButton";
import FollowCounts from "./FollowCounts";
import styled from "styled-components";
import { sharedDetailStyle } from "./sharedstyles";
import { useState } from "react";

const ActionBar = ({
  loggedInUser,
  _id,
  viewedProfile,
  isOwnProfile,
  following,
}) => {
  const [followingState, setFollowingState] = useState(following);
  return (
    <>
      {!isOwnProfile && (
        <ActionBarWrapper>
          <MessageButton loggedInUser={loggedInUser} _id={_id} />
          <FollowButton
            loggedInUser={loggedInUser}
            _id={_id}
            followingState={followingState}
            setFollowingState={setFollowingState}
          />
        </ActionBarWrapper>
      )}
      <FollowCounts viewedProfile={viewedProfile} />
    </>
  );
};

export default ActionBar;

const ActionBarWrapper = styled.div`
  justify-content: space-between;
  ${sharedDetailStyle}
`;
