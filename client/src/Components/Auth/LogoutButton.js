import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { iconStyling } from "../../Styling/StyledComponents";
import { SIZES } from "../../Styling/constants";
import { LogoutIcon } from "../../Styling/Icons";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      <LogoutIcon />
    </Button>
  );
};

export default LogoutButton;

const Button = styled.button`
  ${iconStyling}
  outline: unset;
  outline: 1px solid var(--color-super-dark-grey);
`;
