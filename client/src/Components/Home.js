import styled from "styled-components";
import MapContainer from "./Map/MapContainer";
import { useAuth0 } from "@auth0/auth0-react";

import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  FillDiv,
} from "../styles/StyledComponents";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Wrapper>
      {isAuthenticated && (
        <Content>
          <MapContainer />
        </Content>
      )}
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
