import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FillDiv,
  FlexDiv,
} from "../styles/StyledComponents";
import {
  CircledArrowRight,
  SearchIcon,
  MapIcon,
  HeartIcon,
  SavedHeartIcon,
  NotificationIcon,
  ChatIcon,
  ProfileIcon,
} from "../styles/Icons";

import { useAuth0 } from "@auth0/auth0-react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";
import { useContext } from "react";
import { SIZES } from "../styles/constants";
import LoginButton from "./Auth0/LoginButton";

//TODO: make menu collapse with click of a button.
//STRETCH: make button appear on left/right side of screen according to user settings.

const Menu = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  console.log(isAuthenticated);
  console.log(isLoading);
  const { loggedIn } = useContext(AppContext);
  return (
    <Wrapper>
      <Content>
        {isAuthenticated ? (
          <IconRow>
            <NavLink to="/">
              <MapIcon />
            </NavLink>
            <NavLink to="/search">
              <SearchIcon />
            </NavLink>
            <NavLink to="/profile">
              <ProfileIcon />
            </NavLink>
            <NavLink to="/notifications">
              <NotificationIcon />
            </NavLink>
            {/* <NavLink to="/messages">
            <ChatIcon />
          </NavLink> */
            /*MESSAGES FEATURE..TBD?*/}
            <NavLink to="/saved">
              <HeartIcon />
            </NavLink>
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

const Wrapper = styled(CenteredFlexRowDiv)`
  position: absolute;
  height: ${SIZES.menuHeightCompact}px;
  width: calc(100vw);
  bottom: 20px;
  z-index: 1;
  @media (max-width: ${SIZES.widthMin}px) {
    width: 90%;
  }
`;
const Content = styled(FillDiv)`
  width: 600px;
  background-color: var(--color-darkest-grey);
  border-radius: 10px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  @media (max-width: ${SIZES.widthMed}px) {
    width: 475px;
  }
`;

const IconRow = styled(CenteredFlexRowDiv)`
  width: 100%;
  gap: 50px;
  @media (max-width: ${SIZES.widthMin}px) {
    gap: 8vw;
  }
  & * {
    fill: var(--color-medium-grey);
    cursor: pointer;
    &:hover {
      fill: var(--color-teal);
    }
  }
`;

const LoginContainer = styled(CenteredFlexRowDiv)`
  width: 100%;
`;
