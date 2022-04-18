import styled from "styled-components";
import { SIZES } from "../../styling/constants";

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
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  height: 30px;
  gap: 3px;
  padding: 0 ${SIZES.universalPadding}px;
  border-top: 1px solid var(--color-super-dark-grey);
  border-bottom: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-less-dark-grey);
  @media (min-width: 450px) {
    padding: 2.5px 40px;
    height: 40px;
    font-size: 22px;
  }
`;
