import styled from "styled-components";
import { SIZES } from "../../styling/constants";
import { sharedDetailStyle } from "./sharedstyles";

const ContributionsHeader = ({ submissionsPending, contributions }) => {
  return (
    <ContributionsHeaderWrapper style={{ justifyContent: "center" }}>
      <span>
        {submissionsPending ? (
          <>{contributions?.length - submissionsPending?.length}</>
        ) : (
          <>{contributions?.length}</>
        )}
      </span>{" "}
      pin contribution
      {contributions?.length === 1 ? "" : "s"}{" "}
      {submissionsPending?.length
        ? `(${submissionsPending?.length} pending)`
        : ""}
    </ContributionsHeaderWrapper>
  );
};

export default ContributionsHeader;

const ContributionsHeaderWrapper = styled.div`
  ${sharedDetailStyle}
`;
