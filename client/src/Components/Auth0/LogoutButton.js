import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UnstyledButton } from "../../styles/StyledComponents";
import { SIZES } from "../../styles/constants";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      <h3>Log Out</h3>
    </Button>
  );
};

export default LogoutButton;

const Button = styled(UnstyledButton)`
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  outline: 1px var(--color-less-dark-grey) solid;
  padding: 5px 20px;
  width: fit-content;
`;
