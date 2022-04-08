import styled from "styled-components";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
} from "../Styles/StyledComponents";
import { SIZES } from "../Styles/constants";
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
  max-height: 750px;
  @media (min-width: ${SIZES.widthMin}px) {
    width: 80%;
  }
  @media (min-width: 515px) {
    width: 500px;
  }

  box-shadow: 1.8px 1.6px 4px rgba(0, 0, 0, 0.02),
    4.3px 3.8px 9.6px rgba(0, 0, 0, 0.028),
    8.1px 7.1px 18.2px rgba(0, 0, 0, 0.035),
    14.5px 12.7px 32.4px rgba(0, 0, 0, 0.042),
    27.2px 23.8px 60.6px rgba(0, 0, 0, 0.05),
    65px 57px 145px rgba(0, 0, 0, 0.07);
  outline: 1px solid var(--color-extra-medium-grey);
`;

const InnerContainer = styled(CenteredFlexColumnDiv)`
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Heading = styled(CenteredFlexRowDiv)`
  width: 100%;
  height: 60px;
  background-color: var(--color-darkest-grey);
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
`;
