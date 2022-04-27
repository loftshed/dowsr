import styled from "styled-components/macro";
import { useAuth0 } from "@auth0/auth0-react";
import { iconstyling } from "../../styling/sharedstyles";
import { LogoutIcon } from "../../styling/react-icons";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => {
        localStorage.clear();
        logout({ returnTo: window.location.origin });
      }}
    >
      <LogoutIcon />
    </Button>
  );
};

export default LogoutButton;

const Button = styled.button`
  ${iconstyling}
  outline: unset;
  outline: 1px solid var(--color-super-dark-grey);
`;
