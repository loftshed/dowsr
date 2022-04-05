import styled from "styled-components";
import MapContainer from "./MapContainer";
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
        <MapContainer />
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
  width: 100%;
`;

const ContentBlock = styled(CenteredFlexRowDiv)`
  background-color: var(--color-pink);
  width: 100px;
  height: 100px;
`;
