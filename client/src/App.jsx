import { BrowserRouter, Routes, Route } from "react-router-dom";
import { centeredFlexColumn } from "./styling/sharedstyles";
import { SIZES } from "./styling/constants";
import GlobalStyle from "./styling/GlobalStyles";
import styled from "styled-components";
import Header from "./components/Home/Header";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { Messaging } from "./components/Messaging";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import Error from "./components/Error";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./components/Auth/helpers";
import { Admin } from "./components/Admin";
import FirstLogin from "./components/Auth/FirstLogin";

//TODO: ULTRA MEGA TODO: Redo signin flow!!

const App = () => {
  const { loggedInUser, setLoggedInUser, setFirstLogin } =
    useContext(AppContext);
  // const [firstLogin, setFirstLogin] = useState(null);

  const { user } = useAuth0();

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
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messaging />} />
            <Route path="/search" element={<Home search={true} />} />
            <Route path="/error" element={<Error />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/firstlogin" element={<FirstLogin />} />
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
