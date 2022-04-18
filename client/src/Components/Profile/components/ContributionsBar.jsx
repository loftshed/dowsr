import styled from "styled-components";
import {
  HazardIcon,
  PoliceIcon,
  ToiletIcon,
  WaterIcon,
} from "../../../styling/react-icons";
import { centeredFlexColumn } from "../../../styling/sharedstyles";
import ContributionsHeader from "./ContributionsHeader";
import ContributionType from "./ContributionType";

const ContributionsBar = ({
  submissionsByType,
  submissionsPending,
  contributions,
}) => {
  if (!submissionsByType) return null;
  const { water, toilet, hazard, police } = submissionsByType;

  return (
    <>
      <ContributionsHeader
        submissionsPending={submissionsPending}
        contributions={contributions}
      />
      <ContributionsWrapper>
        <ContributionType numSubmissions={water} filterName={"water"}>
          <WaterIcon />
        </ContributionType>
        <ContributionType numSubmissions={toilet} filterName={"toilet"}>
          <ToiletIcon />
        </ContributionType>
        <ContributionType numSubmissions={hazard} filterName={"hazard"}>
          <HazardIcon />
        </ContributionType>
        <ContributionType numSubmissions={police} filterName={"police"}>
          <PoliceIcon />
        </ContributionType>
      </ContributionsWrapper>
    </>
  );
};

export default ContributionsBar;

const ContributionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 15px;
  @media (min-width: 450px) {
    padding: 20px 20px 25px 20px;
  }
`;

const Column = styled.div`
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
  background-color: var(--color-less-dark-grey);
  border-radius: 50%;
  border: 2px solid ${(props) => props.color};
  svg {
    fill: ${(props) => props.color};
  }
  @media (min-width: 450px) {
    padding: 12px;
  }
`;
