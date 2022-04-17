import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import styled from "styled-components";
import { SIZES } from "../../styling/constants";

import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AppContext } from "../../AppContext";
import { getUser } from "../Auth/helpers";
import { Map } from "./Map";
import FirstLogin from "../Auth/FirstLogin";

const Home = () => {
  const { firstLogin, setFirstLogin } = useContext(AppContext);
  const { user, isAuthenticated /*, isLoading*/ } = useAuth0();
  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const response = await getUser("email", user.email);
          const {
            data: { username },
          } = response;
          if (!username) {
            setFirstLogin(true);
            return;
          }
          localStorage.setItem("username", username);
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
        {isAuthenticated || storedUsername ? (
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
