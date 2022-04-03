import GlobalStyle from "./globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

export default App;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 160px); */
`;
