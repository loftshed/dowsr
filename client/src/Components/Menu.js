import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  IconNavLink,
  TextButton,
} from "../Styling/StyledComponents";
import {
  SearchIcon,
  MapIcon,
  BurgerMenuIcon,
  CreatePinIcon,
} from "../Styling/Icons";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { SIZES } from "../Styling/constants";
import LoginButton from "./Auth/LoginButton";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import BurgerMenu from "./BurgerMenu";
import { MappingContext } from "../Context/MappingContext";
import NewPinModal from "./Map/Modals/NewPinModal";

//TODO: make menu collapse with click of a button.
//TODO: make profile icon change to user avatar when logged in!
//STRETCH: make button appear on left/right side of screen according to user settings.
//STRETCH: make numbers appear over icons for unread notifications..
//TODO: GET NAVLINK HIGHLIGHT WORKING~!! or some kind of equivalent
// or just do something in state...

const Menu = () => {
  const { loggedInUser, showBurgerMenu, setShowBurgerMenu } =
    useContext(AppContext);
  const {
    setShowFilterMenu,
    showFilterMenu,
    setMapModalMessage,
    setCreatingNewPin,
    creatingNewPin,
  } = useContext(MappingContext);

  const { user, isAuthenticated } = useAuth0();

  //TODO: prevent user from accessing any of main page
  // before first login completed?
  //FIXME: not ideal way of doing this below..?

  return (
    <Boundary>
      <Wrapper>
        <Content>
          {isAuthenticated ? (
            <>
              <IconRow>
                <IconNavLink
                  to="/search"
                  onClick={() => {
                    if (creatingNewPin) {
                      setCreatingNewPin(false);
                      setMapModalMessage("");
                    }
                  }}
                >
                  <SearchIcon />
                </IconNavLink>
                <IconNavLink
                  to="/"
                  onClick={() => {
                    if (creatingNewPin) {
                      setCreatingNewPin(false);
                      setMapModalMessage("");
                    }
                  }}
                >
                  <MapIcon />
                </IconNavLink>
                <IconNavLink
                  to="/new"
                  onClick={() => {
                    setMapModalMessage("Creating new pin");
                    setCreatingNewPin(true);
                  }}
                >
                  <CreatePinIcon />
                </IconNavLink>
              </IconRow>
              <IconRow>
                <BurgerButton
                  onClick={() => {
                    setShowBurgerMenu(!showBurgerMenu);
                    if (showFilterMenu) setShowFilterMenu(false);
                  }}
                >
                  <BurgerMenuIcon />
                </BurgerButton>
              </IconRow>
            </>
          ) : (
            <LoginContainer>
              <LoginButton />
            </LoginContainer>
          )}
          <BurgerMenu show={showBurgerMenu} />
          <NewPinModal />
        </Content>
      </Wrapper>
    </Boundary>
  );
};

export default Menu;

const Boundary = styled.div`
  pointer-events: none;
  ${centeredFlexRow}
  position: absolute;
  align-items: flex-end;
  height: 100%;
  bottom: ${SIZES.topBottomPadding}px;
  @media (max-width: ${SIZES.widthMin}px) {
    width: calc(100% - ${SIZES.smallPadding}px*2);
  }
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  padding: 1px;
  * {
    pointer-events: auto;
  }
`;

const BurgerButton = styled(TextButton)`
  box-sizing: border-box;
  background-color: var(--color-button-bg);
  padding: 7.5px;
`;

const Wrapper = styled.div`
  background-color: var(--color-darkest-grey);
  ${centeredFlexRow}
  width: 100%;
  z-index: 100;
`;

const Content = styled.div`
  position: relative;
  ${fillSpace}
  width: 525px;
  height: ${SIZES.menuHeightCompact}px;
  background-color: var(--color-darkest-grey);
  border-radius: 10px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07),
    inset 0px 0px 2px var(--color-super-dark-grey);
  outline: 1px solid var(--color-super-dark-grey);
  justify-content: flex-end;
`;

const IconRow = styled.div`
  ${centeredFlexRow}
  width: fit-content;
  gap: 50px;
  @media (max-width: ${SIZES.widthMin}px) {
    gap: 3.5vw;
  }
  svg {
    width: ${SIZES.iconSize}px;
    height: ${SIZES.iconSize}px;
  }
  padding: 0px 10px;
`;

const LoginContainer = styled.div`
  ${centeredFlexRow}
  width: 100%;
`;

const ButtonsDisabled = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: ${SIZES.borderRadius}px;
  backdrop-filter: blur(2px);
  padding: 5px 10px;
`;
