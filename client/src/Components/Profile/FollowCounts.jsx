import styled, { css } from "styled-components";
import { sharedDetailStyle } from "./sharedstyles";
import MessageButton from "./MessageButton";

const FollowCounts = ({ followerCount, followingCount }) => {
  return (
    <FollowCountsWrapper>
      <Followers>
        <span>followers </span>
        <Number>{followerCount}</Number>
      </Followers>
      <Following>
        <span>following </span>
        <Number>{followingCount}</Number>
      </Following>
    </FollowCountsWrapper>
  );
};

export default FollowCounts;

const FollowCountsWrapper = styled.div`
  ${sharedDetailStyle}
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
`;

//FUN WEIRD STYLE
// 3AM EXPERIMeNT
const N = 1;

const sharedFollowStyling = css`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  line-height: 20px;
  padding: 2px 8px;
  border: 1px solid var(--color-super-dark-grey);
  font-size: 20px;
  text-shadow: ${N}px ${N}px var(--color-super-dark-grey),
    -${N}px -${N}px var(--color-super-dark-grey),
    ${N}px -${N}px var(--color-super-dark-grey),
    -${N}px ${N}px var(--color-super-dark-grey),
    -${N}px 0px var(--color-super-dark-grey),
    ${N}px 0px var(--color-super-dark-grey),
    0px -${N}px var(--color-super-dark-grey),
    0px ${N}px var(--color-super-dark-grey);
  @media (max-width: 450px) {
    font-size: 16px;
    padding: 1px 4px;
  }
`;

const Followers = styled.div`
  background-color: var(--color-teal);
  ${sharedFollowStyling}
`;
const Following = styled.div`
  background-color: var(--color-pink);
  ${sharedFollowStyling}
`;

const Number = styled.div`
  background-color: var(--color-dark-grey);
  padding: 0px 7px;
  border-radius: 4px;
  border: solid 1px var(--color-super-dark-grey);
  @media (max-width: 450px) {
    line-height: 13px;
    padding: 0px 3px;
  }
`;
