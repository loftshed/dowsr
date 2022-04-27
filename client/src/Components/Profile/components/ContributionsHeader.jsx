import styled from "styled-components/macro";
import { sharedDetailStyle } from "../sharedstyles";

const ContributionsHeader = ({ pendingReview, contributions }) => {
  if (!pendingReview && !contributions) return <ContributionsHeaderWrapper />;

  if (contributions?.length === 1)
    return (
      <ContributionsHeaderWrapper>1 contribution</ContributionsHeaderWrapper>
    );

  if (contributions?.length < 1)
    return (
      <ContributionsHeaderWrapper>
        No contributions yet!
      </ContributionsHeaderWrapper>
    );

  if (contributions?.length > 0 && pendingReview?.length > 0)
    return (
      <ContributionsHeaderWrapper>
        {contributions?.length - pendingReview?.length} contributions (
        {pendingReview?.length} pending)
      </ContributionsHeaderWrapper>
    );

  if (contributions?.length > 0)
    return (
      <ContributionsHeaderWrapper>
        {contributions?.length} contributions
      </ContributionsHeaderWrapper>
    );
};

export default ContributionsHeader;

const ContributionsHeaderWrapper = styled.div`
  ${sharedDetailStyle}
  justify-content: center;
`;
