import styled from "styled-components";
import MapContainer from "./Map/MapContainer";

import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  FillDiv,
} from "../styles/StyledComponents";

const Home = () => {
  return (
    <Wrapper>
      <Content>
        <MapContainer />
      </Content>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-blue);
  width: 100%;
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
`;
