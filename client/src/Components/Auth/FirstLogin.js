import styled from "styled-components";
import ResponsiveContainer from "../ResponsiveContainer";
import { FillDiv, CenteredFlexColumnDiv } from "../../Styles/StyledComponents";
import { SIZES } from "../../Styles/constants";

const FirstLogin = () => {
  return (
    <Wrapper>
      <ResponsiveContainer heading={"Welcome!"}>
        <Content>
          <Heading></Heading>
          <Signup>
            <input></input>
            <input></input>
            <input></input>
          </Signup>
        </Content>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default FirstLogin;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-blue);
  width: 100%;
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
  padding: ${SIZES.universalPadding}px;
  justify-content: flex-start;
`;

const Heading = styled(CenteredFlexColumnDiv)`
  text-align: center;
  width: 60%;
`;

const Signup = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  border-radius: ${SIZES.borderRadius}px;
`;
