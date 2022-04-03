import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  Wrapper,
} from "./styles/StyledComponents";

const Home = () => {
  return (
    <BodyWrapper>
      <Content>THIS IS THEE BODY</Content>
    </BodyWrapper>
  );
};

export default Home;

const BodyWrapper = styled(Wrapper)`
  background-color: var(--color-dark-blue);
`;

const Content = styled(CenteredFlexRowDiv)`
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  padding: 5px var(--content-inner-padding-h);
  height: calc(100vh - var(--header-height));
  width: 100%;
`;
