import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./Styling/StyledComponents";
import { SIZES } from "./Styling/constants";
import GlobalStyle from "./Styling/GlobalStyles";
import styled from "styled-components";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Profile from "./Components/Profile";
import Notifications from "./Components/Notifications";
import Messages from "./Components/Messages/Messages";
import Error from "./Components/Error";
import Saved from "./Components/Saved";
import AlertModal from "./Components/AlertModal";
import LoginButton from "./Components/Auth/LoginButton";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "./Components/Auth/userHelpers";
import { getThreads } from "./Components/Messages/chatHelpers";

const App = () => {
  const {
    firstLogin,
    setFirstLogin,
    loggedInUser,
    setLoggedInUser,
    setThreads,
  } = useContext(AppContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    (async () => {
      if (!isLoading) {
        const { data } = await getUser("email", user?.email);
        setLoggedInUser(data);
        const { threads } = await getThreads(data?._id);
        setThreads(threads);
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/saved" element={<Home saved={true} />} />
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

// TODO: fix this shit (mobile browsers don't work well with viewport height)
const Main = styled(CenteredFlexColumnDiv)`
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
