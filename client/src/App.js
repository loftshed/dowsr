import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./styles/StyledComponents";
import { SIZES } from "./styles/constants";
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";
import Header from "./Components/Header";
import HomeScreen from "./Components/HomeScreen";
import Profile from "./Components/Profile";
import ResponsiveContainer from "./Components/ResponsiveContainer";
import Menu from "./Components/Menu";

const App = () => {
  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Header />
      <Main>
        <Content>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/profile"
              element={<ResponsiveContainer type={"profile"} />}
            />
            <Route
              path="/notifications"
              element={<ResponsiveContainer type={"notification"} />}
            />
          </Routes>
        </Content>
        <Menu />
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled(CenteredFlexColumnDiv)`
  background-color: var(--color-dark-grey);
  height: calc(100vh - ${SIZES.lrgHeader}px);
  @media (max-width: ${SIZES.widthMin}px) {
    height: calc(100vh - ${SIZES.smlHeader}px);
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
