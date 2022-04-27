import styled from "styled-components";
import { centeredFlexColumn } from "../../../styling/sharedstyles";

const ContributionType = ({ numSubmissions, filterName, children }) => {
  return (
    <ContributionTypeWrapper>
      <Icon color={`var(--color-${filterName})`}>{children}</Icon>
      <Number>{numSubmissions ? <>{numSubmissions}</> : 0}</Number>
    </ContributionTypeWrapper>
  );
};

export default ContributionType;

const ContributionTypeWrapper = styled.div`
  ${centeredFlexColumn}
  gap: 7.5px;
  @media (min-width: 450px) {
    gap: 15px;
  }
`;

const Number = styled.div`
  line-height: 12px;
`;

const Icon = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  border-radius: 50%;
  border: 2px solid ${(props) => props.color};
  svg {
    fill: ${(props) => props.color};
  }
  @media (min-width: 450px) {
    padding: 12px;
  }
`;
