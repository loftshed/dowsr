import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { handleToggleFollow } from '../helpers';
import { RiUserFollowLine as FollowIcon, RiUserUnfollowLine as UnfollowIcon } from 'react-icons/ri';
import { BsFillCheckCircleFill as CheckIcon } from 'react-icons/bs';
import { ProfileButton } from '../sharedstyles';
import { AppContext } from '../../AppContext';

// FollowButton is a child of ActionBar.
// TODO: After follow, first show "following!" confirmation and disable button until hover is false.

const FollowButton = ({
  _id,
  followingState,
  setFollowingState,
  setFollowerCount,
  viewedProfile,
  setViewedProfile,
}) => {
  const { loggedInUser } = useContext(AppContext);

  const [hover, setHover] = useState(false);
  // Follows or unfollows user.
  // setFollowerCount(followerCount += 1);
  useEffect(() => {
    if (viewedProfile.followers?.includes(loggedInUser?._id)) {
      setFollowingState(true);
    }
  }, [followingState, viewedProfile]);

  return (
    <FollowButtonWrapper
      onClick={async () => {
        if (followingState === false) {
          const result = handleToggleFollow(loggedInUser._id, _id, true);

          setFollowingState(true);
          if (!result.unmodified) {
            setViewedProfile({
              ...viewedProfile,
              followers: [
                ...viewedProfile.followers,
                {
                  userId: loggedInUser._id,
                  username: loggedInUser.username,
                  avatarUrl: loggedInUser.avatarUrl,
                },
              ],
            });
          }
          return;
        }
        if (followingState === true) {
          const result = handleToggleFollow(loggedInUser._id, _id);

          setFollowingState(false);
          if (!result.unmodified)
            setViewedProfile({
              ...viewedProfile,
              followers: viewedProfile.followers.filter(
                (follower) => follower.userId !== loggedInUser._id
              ),
            });

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
              <UnfollowIcon style={{ display: 'inline' }} />
            </>
          ) : (
            <>
              <Text>{'Following'}</Text>
              <CheckIcon style={{ display: 'inline' }} />
            </>
          )}
        </>
      ) : (
        <>
          <Text>{'Follow'}</Text>
          <FollowIcon style={{ display: 'inline' }} />
        </>
      )}
    </FollowButtonWrapper>
  );
};

export default FollowButton;

const FollowButtonWrapper = styled(ProfileButton)`
  border-radius: 5px;
  @media (min-width: 450px) {
    width: 150px;
  }
  @media (max-width: 450px) {
    line-height: 22px;
  }
`;
const Text = styled.div``;
