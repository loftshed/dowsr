import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import styled from "styled-components/macro";

import { centeredFlexColumn } from "./styling/sharedstyles";
import { getUser } from "./components/Auth/helpers";

import { AppContext } from "./components/AppContext";
import { Admin } from "./components/Admin";
import Error from "./components/Error";
import FirstLogin from "./components/Auth/FirstLogin";
import GlobalStyle from "./styling/GlobalStyles";
import Header from "./components/Header";
import { Map } from "./components/Map";
import { Menu } from "./components/Menu";
import Chat from "./components/Chat";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Theme from "./AppTheme";
import ThemeMUI from "./AppTheme.mui";
import { useAuth0 } from "@auth0/auth0-react";

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
  }, [user, loggedInUser, setLoggedInUser, setFirstLogin]); // Re-render if the user changes.

  return (
    <BrowserRouter id="root">
      <ThemeMUI>
        <Theme>
          <GlobalStyle />
          <Header />
          <Main>
            <Content>
              <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/new" element={<Map />} />
                {/* would be better to not send this to /new since it just initiates pin creation process via state anyways */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Chat />} />
                <Route path="/search" element={<Map search={true} />} />
                <Route path="/error" element={<Error />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/firstlogin" element={<FirstLogin />} />
              </Routes>
            </Content>
            <Menu />
          </Main>
        </Theme>
      </ThemeMUI>
    </BrowserRouter>
  );
};

export default App;

const Main = styled.div`
  ${centeredFlexColumn}
  background-color: ${(props) => props.theme.colors.darkGrey};
  height: calc(100% - ${(props) => props.theme.sizes.lrgHeader}px);
  @media (max-width: ${(props) => props.theme.sizes.widthMin}px) {
    height: calc(100% - ${(props) => props.theme.sizes.smlHeader}px);
  }
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  border-left: 2px solid ${(props) => props.theme.colors.green};
  border-right: 2px solid ${(props) => props.theme.colors.green};
  height: 100%;
  width: 100%;
  @media (min-width: ${(props) => props.theme.sizes.widthMax}px) {
    width: ${(props) => props.theme.sizes.widthMax}px;
  }
`;
