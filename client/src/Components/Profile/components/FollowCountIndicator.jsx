import styled, { css } from "styled-components";
import { fakeStroke } from "../../../styling/sharedstyles";

const FollowCountIndicator = ({ count, type, color }) => {
  return (
    <FollowCountsWrapper>
      <CountContainer color={color}>
        <span>{type}</span>
        <Number>{count ? <>{count}</> : 0}</Number>
      </CountContainer>
    </FollowCountsWrapper>
  );
};

export default FollowCountIndicator;

const FollowCountsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  @media (min-width: 450px) {
    gap: 10px;
  }
`;

const sharedFollowStyling = css`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  line-height: 20px;
  padding: 2px 8px;
  border: 1px solid var(--color-super-dark-grey);
  font-size: 20px;
  @media (max-width: 450px) {
    font-size: 16px;
    padding: 1px 4px;
  }
  ${fakeStroke}
`;

const CountContainer = styled.div`
  background-color: ${(props) => props.color};
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
