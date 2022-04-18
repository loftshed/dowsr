import styled from "styled-components";

const FollowCounts = ({ viewedProfile }) => {
  return (
    <FollowCountsWrapper>
      <Followers>followers: {viewedProfile.followers?.length}</Followers>
      <Following>following: {viewedProfile.following?.length}</Following>
    </FollowCountsWrapper>
  );
};

export default FollowCounts;

const FollowCountsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  text-transform: uppercase;
`;

const Followers = styled.div``;

const Following = styled.div``;
