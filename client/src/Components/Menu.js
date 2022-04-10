import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FillDiv,
  IconNavLink,
  TextButton,
} from "../Styling/StyledComponents";
import {
  SearchIcon,
  MapIcon,
  HeartIcon,
  NotificationIcon,
  ProfileIcon,
  BurgerMenuIcon,
  ChatIcon,
} from "../Styling/Icons";

import { useAuth0 } from "@auth0/auth0-react";
import styled /*, { css }*/ from "styled-components";
import { SIZES } from "../Styling/constants";
import LoginButton from "./Auth/LoginButton";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

//TODO: make menu collapse with click of a button.
//TODO: make profile icon change to user avatar when logged in!
//STRETCH: make button appear on left/right side of screen according to user settings.
//TODO: GET NAVLINK HIGHLIGHT WORKING~!!

const Menu = () => {
  const { firstLogin, signupCompleted } = useContext(AppContext);
  const { user, isAuthenticated } = useAuth0();

  //TODO: prevent user from accessing any of main page
  // before first login completed?
  //FIXME: not ideal way of doing this below..?

  return (
    <Wrapper>
      <Content>
        {isAuthenticated ? (
          <IconRow>
            <IconNavLink to="/">
              <MapIcon />
            </IconNavLink>
            <IconNavLink to="/search">
              <SearchIcon />
            </IconNavLink>
            <IconNavLink to="/notifications">
              <NotificationIcon />
            </IconNavLink>
            <IconNavLink to="/messages">
              <ChatIcon />
            </IconNavLink>
            <IconNavLink to="/profile">
              <ProfileIcon />
            </IconNavLink>
            <BurgerButton>
              <BurgerMenuIcon />
            </BurgerButton>
          </IconRow>
        ) : (
          <LoginContainer>
            <LoginButton />
          </LoginContainer>
        )}
      </Content>
    </Wrapper>
  );
};

export default Menu;

const BurgerButton = styled(TextButton)`
  box-sizing: border-box;
  background-color: var(--color-button-bg);
  padding: 7.5px;
`;

const Wrapper = styled(CenteredFlexRowDiv)`
  position: absolute;
  height: ${SIZES.menuHeightCompact}px;
  width: calc(100vw);
  bottom: ${SIZES.topBottomPadding}px;
  z-index: 1;
  @media (max-width: ${SIZES.widthMin}px) {
    width: calc(100% - ${SIZES.smallPadding}px*2);
  }
`;
const Content = styled(FillDiv)`
  width: 525px;
  background-color: var(--color-darkest-grey);
  border-radius: 10px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
`;

const IconRow = styled(CenteredFlexRowDiv)`
  width: 100%;
  gap: 50px;
  @media (max-width: ${SIZES.widthMin}px) {
    gap: 3.5vw;
  }
  & * {
    fill: var(--color-medium-grey);
  }
  svg {
    width: ${SIZES.iconSize}px;
    height: ${SIZES.iconSize}px;
  }
`;

const LoginContainer = styled(CenteredFlexRowDiv)`
  width: 100%;
`;

const ButtonsDisabled = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${SIZES.borderRadius}px;
  backdrop-filter: blur(2px);
  padding: 5px 10px;
`;
