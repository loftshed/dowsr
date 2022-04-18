import styled, { css } from "styled-components";
import { sharedDetailStyle } from "./sharedstyles";

const FollowCounts = ({ viewedProfile }) => {
  return (
    <FollowCountsWrapper>
      <Followers>
        <Number>{viewedProfile.followers?.length}</Number>
        <span>follower</span>
      </Followers>
      <Following>
        <span>following</span>
        <Number>{viewedProfile.following?.length}</Number>
      </Following>
    </FollowCountsWrapper>
  );
};

export default FollowCounts;

const FollowCountsWrapper = styled.div`
  ${sharedDetailStyle}
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const sharedFollowStyling = css`
  display: flex;
  gap: 10px;
  border-radius: 2px;
  line-height: 20px;
  padding: 0 5px;
  * {
    font-size: 18px;
  }
`;

const Followers = styled.div`
  ${sharedFollowStyling}
`;
const Following = styled.div`
  ${sharedFollowStyling}
`;

const Number = styled.div`
  background-color: var(--color-less-dark-grey);
`;
