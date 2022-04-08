import styled from "styled-components";
import ResponsiveContainer from "../ResponsiveContainer";
import { FillDiv, CenteredFlexColumnDiv } from "../../Styles/StyledComponents";
import { SIZES } from "../../Styles/constants";

const FirstLogin = () => {
  return (
    <Wrapper>
      <ResponsiveContainer heading={"Welcome!"}>
        <Content>
          <Heading>
            <h3>Thanks for signing up! We just need a few more details...</h3>
          </Heading>
          <Signup></Signup>
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
`;

const Heading = styled(CenteredFlexColumnDiv)``;

const Signup = styled.form``;
