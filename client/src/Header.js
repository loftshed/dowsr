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
      <Content>test</Content>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled(Wrapper)`
  background-color: var(--color-med-blue);
`;

const Content = styled(FlexDiv)`
  align-items: flex-end;
  background-color: orange;
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  padding: 5px 10px;
  width: 100%;
  height: var(--header-height);
`;
