import styled from "styled-components/macro";
import { useAuth0 } from "@auth0/auth0-react";
import { TextButton } from "../../styling/sharedstyles";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()}>
      <h3>Log In</h3>
    </Button>
  );
};

export default LoginButton;

const Button = styled(TextButton)`
  height: 100%;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.teal};
  }
`;
