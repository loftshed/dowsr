import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  Wrapper,
} from "./styles/StyledComponents";

const Home = () => {
  return (
    <BodyWrapper>
      <Content>
        THIS IS THEE BODY
        <ContentGrid>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
        </ContentGrid>
      </Content>
    </BodyWrapper>
  );
};

export default Home;

const BodyWrapper = styled(Wrapper)`
  background-color: var(--color-dark-blue);
`;

const Content = styled(CenteredFlexColumnDiv)`
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  padding: 5px var(--content-inner-padding-h);
  height: calc(100vh - var(--header-height));
  width: 100%;
`;

const ContentBlock = styled(CenteredFlexRowDiv)`
  background-color: var(--color-pink);
  width: 100px;
  height: 100px;
`;
