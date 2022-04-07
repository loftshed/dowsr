import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UnstyledButton } from "../../styles/StyledComponents";
import { SIZES } from "../../styles/constants";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()}>
      <h3>Log In</h3>
    </Button>
  );
};

export default LoginButton;

const Button = styled(UnstyledButton)`
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-dark-grey);
  padding: 15px 20px;
  height: 100%;
  width: 100%;
  &:hover {
    background-color: var(--color-teal);
  }
`;
