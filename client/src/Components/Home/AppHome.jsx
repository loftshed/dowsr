import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import styled from "styled-components";
import { SIZES } from "../../styling/constants";

import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AppContext } from "../../AppContext";
import { getUser } from "../Auth/helpers";
import { Map } from "./Map";
import FirstLogin from "../Auth/FirstLogin";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loggedInUser, setLoggedInUser } = useContext(AppContext);
  const [firstLogin, setFirstLogin] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Return immediately if user unavailable or logged in.
        if (!user || loggedInUser) return;

        // If user is available from Auth0, but still not logged in, check localStorage for user object.
        const locallyStoredUser = JSON.parse(
          localStorage.getItem("locallyStoredUser")
        );
        // If user is available from localStorage, set loggedInUser to user from localStorage.
        if (locallyStoredUser) {
          setLoggedInUser(locallyStoredUser);
          return;
        }
        // If the user is not available in localStorage, get user from backend.
        const { data, userFound } = await getUser("email", user.email);

        // If user is found in backend, It must be the user's first login.
        if (!userFound) {
          setFirstLogin(true);
          return;
        }
        // If none of the early returns were triggered, we have a user,
        setFirstLogin(false); // And we know it is not the user's first login.
        localStorage.setItem("locallyStoredUser", JSON.stringify(data)); // So, store the user in localStorage.
        setLoggedInUser(data); // Then set the loggedInUser state to the user found in the database.
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user, loggedInUser]); // Re-render if the user changes.

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  console.log("firstLogin", firstLogin);

  if (firstLogin) return <FirstLogin />;

  return (
    <Wrapper>
      <>
        {isAuthenticated ? (
          <Content>
            <Map />
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

const Wrapper = styled.div`
  ${fillSpace}
  background-color: var(--color-dark-grey);
  width: 100%;
`;

const Content = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
`;

const Welcome = styled.div`
  ${centeredFlexColumn}
  line-height: 1;
  text-align: center;
  padding: ${SIZES.universalPadding}px;
  gap: 25px;
`;
