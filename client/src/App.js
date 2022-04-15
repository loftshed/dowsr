import { BrowserRouter, Routes, Route } from "react-router-dom";
import { centeredFlexColumn } from "./Styling/StyledComponents";
import { SIZES } from "./Styling/constants";
import GlobalStyle from "./Styling/GlobalStyles";
import styled from "styled-components";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Menu from "./Components/Menus/Menu";
import Profile from "./Components/Profile";
import Notifications from "./Components/Notifications";
import { Messaging } from "./Components/Messaging";
import Error from "./Components/Etc/Error";
import LoginButton from "./Components/Auth/LoginButton";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./Components/helpers/userHelpers";

//TODO: ULTRA MEGA TODO: Redo signin flow!!

const App = () => {
  const { setLoggedInUser } = useContext(AppContext);
  const { user, /* isAuthenticated, */ isLoading } = useAuth0();

  useEffect(() => {
    (async () => {
      if (!isLoading && user) {
        const { data } = await getUser("email", user.email);
        setLoggedInUser(data);
      }
    })();
  }, [isLoading, user]);

  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Header />
      <Main>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messaging />} />
            <Route path="/search" element={<Home search={true} />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Content>
        <Menu />
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled.div`
  ${centeredFlexColumn}
  background-color: var(--color-dark-grey);
  height: calc(100% - ${SIZES.lrgHeader}px);
  @media (max-width: ${SIZES.widthMin}px) {
    height: calc(100% - ${SIZES.smlHeader}px);
  }
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  height: 100%;
  width: 100%;
  @media (min-width: ${SIZES.widthMax}px) {
    width: ${SIZES.widthMax}px;
  }
`;
