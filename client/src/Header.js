import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  Wrapper,
} from "./styles/StyledComponents";

const Header = () => {
  return (
    <HeaderWrapper>
      <Content>
        <h1>Final Project</h1>
      </Content>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled(Wrapper)`
  background-color: var(--color-med-blue);
`;

const Content = styled(FlexDiv)`
  align-items: flex-end;
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  padding: 0px var(--content-inner-padding-h);
  height: var(--header-height);
  width: 100%;
`;
