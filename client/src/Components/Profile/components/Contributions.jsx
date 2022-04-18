import styled from "styled-components";
import {
  HazardIcon,
  PoliceIcon,
  ToiletIcon,
  WaterIcon,
} from "../../../styling/react-icons";
import { centeredFlexColumn } from "../../../styling/sharedstyles";
import ContributionsHeader from "./ContributionsHeader";

const Contributions = ({
  submissionsByType,
  submissionsPending,
  contributions,
}) => {
  return (
    <>
      <ContributionsHeader
        submissionsPending={submissionsPending}
        contributions={contributions}
      />
      <ContributionsWrapper>
        <Column>
          <Icon color={"var(--color-water)"}>
            <WaterIcon />
          </Icon>
          <Number>
            {submissionsByType?.water ? <>{submissionsByType.water}</> : <>0</>}
          </Number>
        </Column>
        <Column>
          <Icon color={"var(--color-poo)"}>
            <ToiletIcon />
          </Icon>
          <Number>
            {submissionsByType?.toilet ? (
              <>{submissionsByType.toilet}</>
            ) : (
              <>0</>
            )}
          </Number>
        </Column>
        <Column>
          <Icon color={"var(--color-cone)"}>
            <HazardIcon />
          </Icon>
          <Number>
            {submissionsByType?.hazard ? (
              <>{submissionsByType.hazard}</>
            ) : (
              <>0</>
            )}
          </Number>
        </Column>
        <Column>
          <Icon color={"var(--color-police)"}>
            <PoliceIcon />
          </Icon>
          <Number>
            {submissionsByType?.police ? (
              <>{submissionsByType.police}</>
            ) : (
              <>0</>
            )}
          </Number>
        </Column>
      </ContributionsWrapper>
    </>
  );
};

export default Contributions;

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
