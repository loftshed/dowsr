import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { TextButton } from "../../Styles/StyledComponents";
import { SIZES } from "../../Styles/constants";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      <h3>Log Out</h3>
    </Button>
  );
};

export default LogoutButton;

const Button = styled(TextButton)`
  padding: 5px 20px;
`;
