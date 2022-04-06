import styled from "styled-components";
import MapContainer from "./Map/MapContainer";

import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  FillDiv,
} from "./styles/StyledComponents";

const HomeScreen = () => {
  return (
    <Wrapper>
      <Content>{/* <MapContainer /> */}</Content>
    </Wrapper>
  );
};

export default HomeScreen;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-blue);
  width: 100%;
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
`;
