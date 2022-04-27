import styled from "styled-components/macro";
import { centeredFlexColumn, centeredFlexRow } from "./sharedstyles";

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

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.darkGrey};
`;

const Content = styled.div`
  position: absolute;
  ${centeredFlexColumn}
  width: 100%;
  height: calc(
    100% - ${(props) => props.theme.sizes.menuHeightCompact}px -
      ${(props) => props.theme.sizes.topBottomPadding}px
  );
  padding: ${(props) => props.theme.sizes.topBottomPadding}px
    ${(props) => props.theme.sizes.smallPadding}px;
`;

// MIN AMOUNT OF SPACE BETWEEN OUTER CONTAINER AND RESPONSIVECONTAINER
/* padding: ${(props) => props.theme.sizes.universalPadding}px; */

const OuterContainer = styled.div`
  ${centeredFlexColumn}
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  width: 100%;
  height: 100%;
  @media (min-width: ${(props) => props.theme.sizes.widthMin}px) {
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
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  ${centeredFlexColumn}
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Heading = styled.div`
  ${centeredFlexRow}
  user-select: none;
  width: 100%;
  height: fit-content;
  padding: 3px 0px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-top-left-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-top-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-bottom: 1.5px solid ${(props) => props.theme.colors.superDarkGrey};
  box-shadow: inset 0px 0px 3px ${(props) => props.theme.colors.superDarkGrey};
`;
