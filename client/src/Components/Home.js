import styled from "styled-components";
import MapContainer from "./Map/MapContainer";
import ResponsiveContainer from "./ResponsiveContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { SIZES } from "../styles/constants";

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
      <>
        {isAuthenticated ? (
          <Content>
            <MapContainer />
          </Content>
        ) : (
          <ResponsiveContainer>
            <Content>
              <Welcome>
                <h1>Welcome to Dowsr!</h1>
                <p>Please log in to continue.</p>
              </Welcome>
            </Content>
          </ResponsiveContainer>
        )}
      </>
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
  height: 100%;
`;

const Welcome = styled(CenteredFlexColumnDiv)`
  line-height: 1;
  text-align: center;
  padding: ${SIZES.universalPadding}px;
  gap: 25px;
`;
