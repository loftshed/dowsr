import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./styles/StyledComponents";
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile/Profile";
import { SIZES } from "./styles/constants";

const App = () => {
  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Header />
      <Main>
        <Content>
          <Sidebar />
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
  background-color: var(--color-dark-grey);
  height: calc(100vh - var(--header-height));
  @media (max-width: ${SIZES.widthMin}) {
    height: calc(100vh - var(--sml-header-height));
  }
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green);
  height: 100%;
  width: 100%;
  @media (min-width: ${SIZES.widthMax}) {
    width: ${SIZES.widthMax};
  }
`;
