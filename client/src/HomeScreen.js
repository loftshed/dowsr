import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  BodyPadding,
} from "./styles/StyledComponents";

const HomeScreen = () => {
  return (
    <Wrapper>
      <Content>
        THIS IS THEE BODY
        <ContentGrid>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
          <ContentBlock>test</ContentBlock>
        </ContentGrid>
      </Content>
    </Wrapper>
  );
};

export default HomeScreen;

const Wrapper = styled(BodyPadding)`
  background-color: var(--color-dark-blue);
`;

const Content = styled(CenteredFlexColumnDiv)`
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  padding: 5px var(--content-inner-padding-h);
  width: 100%;
`;

const ContentBlock = styled(CenteredFlexRowDiv)`
  background-color: var(--color-pink);
  width: 100px;
  height: 100px;
`;
