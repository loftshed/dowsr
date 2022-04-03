import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CenteredFlexColumnDiv } from "./styles/StyledComponents";
import GlobalStyle from "./styles/GlobalStyles";
import styled from "styled-components";
import Home from "./Home";
import Header from "./Header";

const App = () => {
  return (
    <BrowserRouter id="root">
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled(CenteredFlexColumnDiv)`
  height: 100%;
  width: 100%;
  /* @media screen and (max-height: 1080px) {
  } */
`;
