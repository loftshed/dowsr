import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./styles/StyledComponents";
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile/Profile";

const App = () => {
  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Sidebar />
      <Header />
      <Main>
        <Content>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Content>
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled(CenteredFlexColumnDiv)`
  background-color: var(--color-dark-blue);
  height: calc(100vh - var(--header-height));
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  height: 100%;
  width: 100%;
  @media (min-width: 1280px) {
    width: 1280px;
  }
`;
