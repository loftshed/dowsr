import styled from "styled-components";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
} from "../Styling/StyledComponents";
import { SIZES } from "../Styling/constants";
import Profile from "./Profile";
import Notifications from "./Notifications";

const ResponsiveContainer = ({ children, heading }) => {
  return (
    <Wrapper>
      <Content>
        <OuterContainer>
          <InnerContainer>
            {heading && (
              <Heading>
                <h2>{heading}</h2>
              </Heading>
            )}
            {children}
          </InnerContainer>
        </OuterContainer>
      </Content>
    </Wrapper>
  );
};

export default ResponsiveContainer;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-grey);

  /* justify-content: flex-start; /// testing */
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: calc(
    100% - ${SIZES.menuHeightCompact}px - ${SIZES.universalPadding}px
  );
  padding: ${SIZES.universalPadding}px;
`;

const OuterContainer = styled(CenteredFlexColumnDiv)`
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-less-dark-grey);
  width: 100%;
  height: 100%;
  @media (min-width: ${SIZES.widthMin}px) {
    width: 80%;
  }
  @media (min-width: 525px) {
    width: 100%;
    max-width: 725px;
  }

  box-shadow: 1.8px 1.6px 4px rgba(0, 0, 0, 0.02),
    4.3px 3.8px 9.6px rgba(0, 0, 0, 0.028),
    8.1px 7.1px 18.2px rgba(0, 0, 0, 0.035),
    14.5px 12.7px 32.4px rgba(0, 0, 0, 0.042),
    27.2px 23.8px 60.6px rgba(0, 0, 0, 0.05),
    65px 57px 145px rgba(0, 0, 0, 0.07);
  outline: 1px solid var(--color-super-dark-grey);
`;

const InnerContainer = styled(CenteredFlexColumnDiv)`
  border-radius: ${SIZES.borderRadius}px;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  box-shadow: inset 0px 0px 2px var(--color-super-dark-grey);
`;

const Heading = styled(CenteredFlexRowDiv)`
  width: 100%;
  height: fit-content;
  padding: 3px 0px;
  background-color: var(--color-darkest-grey);
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
  border-bottom: 1.5px solid var(--color-super-dark-grey);
  box-shadow: inset 0px 0px 3px var(--color-super-dark-grey);
`;
