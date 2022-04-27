import styled from "styled-components/macro";
import {
  HazardIcon,
  PoliceIcon,
  ToiletIcon,
  WaterIcon,
} from "../../../styling/react-icons";
import ContributionsHeader from "./ContributionsHeader";
import ContributionType from "./ContributionType";

const ContributionsBar = ({
  contributionsByType,
  pendingReview,
  contributions,
}) => {
  if (!contributionsByType) return null;
  const { water, toilet, hazard, police } = contributionsByType;

  return (
    <>
      <ContributionsHeader
        pendingReview={pendingReview}
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
