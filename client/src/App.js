import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./styles/StyledComponents";
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";
// import HomeScreen from "./HomeScreen";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import MapsWrapper from "./MapsWrapper";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile/Profile";

const App = () => {
  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Header />
      <Sidebar />
      <Main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled(CenteredFlexColumnDiv)`
  height: calc(100vh - var(--header-height));
  width: 100%;
  /* @media screen and (max-height: 1080px) {
  } */
`;
