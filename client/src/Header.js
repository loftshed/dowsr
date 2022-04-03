import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
} from "./styles/StyledComponents";

const Header = () => {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(CenteredFlexRowDiv)``;

const Container = styled(FlexDiv)`
  height: 100px;
`;
