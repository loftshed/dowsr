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
  width: 100%;
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
`;
