import { useContext, useEffect } from "react";
import styled from "styled-components";
import MapContainer from "./Map/MapContainer";
import ResponsiveContainer from "./ResponsiveContainer";
import FirstLogin from "./Auth/FirstLogin";
import { useAuth0 } from "@auth0/auth0-react";
import { SIZES } from "../Styling/constants";
import { addUserToDB, getUser } from "./Auth/userHelpers";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  FillDiv,
} from "../Styling/StyledComponents";
import { AppContext } from "../Context/AppContext";

const Home = () => {
  const { firstLogin, setFirstLogin } = useContext(AppContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  // TODO: maybe move this action to login button? as something other than a useEffect..?
  // TODO: maybe if user has been found to exist in db, keep in local storage and don't query again
  // TODO: make it so you don't have to log in to use the app..

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const { userFound } = await getUser(user.email);
          if (!userFound) setFirstLogin(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  if (firstLogin) return <FirstLogin />;

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
  background-color: var(--color-dark-grey);
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
