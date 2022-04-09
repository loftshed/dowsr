import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./Styles/StyledComponents";
import { SIZES } from "./Styles/constants";
import GlobalStyle from "./Styling/GlobalStyles";
import styled from "styled-components";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Profile from "./Components/Profile";
import Notifications from "./Components/Notifications";
import Messages from "./Components/Messages";
import Error from "./Components/Error";
import Saved from "./Components/Saved";
import AlertModal from "./Components/AlertModal";
import LoginButton from "./Components/Auth/LoginButton";

const App = () => {
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
