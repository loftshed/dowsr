import styled from "styled-components";
import { sharedDetailStyle } from "../sharedstyles";

const ContributionsHeader = ({ submissionsPending, contributions }) => {
  if (!submissionsPending && !contributions)
    return <ContributionsHeaderWrapper />;

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

  if (contributions?.length > 0 && submissionsPending?.length > 0)
    return (
      <ContributionsHeaderWrapper>
        {contributions?.length - submissionsPending?.length} contributions (
        {submissionsPending?.length} pending)
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
