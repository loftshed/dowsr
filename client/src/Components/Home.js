import { useEffect } from "react";
import styled from "styled-components";
import MapContainer from "./Map/MapContainer";
import ResponsiveContainer from "./ResponsiveContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { SIZES } from "../Styles/constants";
import { addUserToDB, checkUserEmail } from "./Auth0/userHelpers";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  ContentGrid,
  FillDiv,
} from "../Styles/StyledComponents";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // TODO: maybe move this action to login button? as something other than a useEffect..?
  // TODO: maybe if user has been found to exist in db, keep in local storage and don't query again
  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const { userFound } = await checkUserEmail(user.email);
          if (!userFound) {
            console.log("no user found, adding new user");
            addUserToDB(user);
          } else {
            console.log("user already exists");
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // first check database to see if user email already exists.
  // if not, add user to database

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
