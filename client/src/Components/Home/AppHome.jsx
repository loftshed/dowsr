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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loggedInUser, firstLogin } = useContext(AppContext);
  const navigate = useNavigate();

  if (firstLogin) navigate("/firstlogin");

  if (!isAuthenticated)
    return (
      <Wrapper>
        <ResponsiveContainer>
          <Content>
            <Welcome>
              <h1>Welcome to Dowsr!</h1>
              <p>Please log in to continue.</p>
            </Welcome>
          </Content>
        </ResponsiveContainer>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Content>
        <Map />
      </Content>
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
