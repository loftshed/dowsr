import styled from "styled-components";

const FollowCounts = ({ viewedProfile }) => {
  return (
    <FollowCountsWrapper>
      <div>followers: {viewedProfile.followers?.length}</div>
      <div>following: {viewedProfile.following?.length}</div>
    </FollowCountsWrapper>
  );
};

const FollowCountsWrapper = styled.div``;
