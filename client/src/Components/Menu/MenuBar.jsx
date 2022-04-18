import {
  boxShadow,
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  IconNavLink,
  TextButton,
} from "../../styling/sharedstyles";
import {
  SearchIcon,
  MapIcon,
  BurgerMenuIcon,
  CreatePinIcon,
} from "../../styling/react-icons";
import { TiThMenu } from "react-icons/ti";

import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { SIZES } from "../../styling/constants";
import LoginButton from "../Auth/LoginButton";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { MappingContext } from "../Home/Map/MappingContext";
import BurgerMenuPopout from "./BurgerMenuPopout";
import NewPinModal from "../Home/Map/PinCreation/NewPinModal";
import SearchContainer from "./SearchContainer";

const MenuBar = () => {
  const {
    loggedInUser,
    showBurgerMenu,
    setShowBurgerMenu,
    showSearchBar,
    setShowSearchBar,
  } = useContext(AppContext);
  const {
    setShowFilterMenu,
    showFilterMenu,
    setMapModalMessage,
    setCreatingNewPin,
    creatingNewPin,
    showPinCreationModal,
    setShowPinCreationModal,
    mapModalMessage,
    pinCreationSuccessful,
    setPinCreationSuccessful,
    newPinData,
    setNewPinData,
  } = useContext(MappingContext);

  const { user, isAuthenticated } = useAuth0();

  return (
    <Boundary>
      <Wrapper>
        <Content>
          {isAuthenticated ? (
            <>
              <IconRow>
                <IconNavLink
                  to="/search"
                  onClick={(ev) => {
                    if (creatingNewPin) {
                      setCreatingNewPin(false);
                      setMapModalMessage("");
                    }
                    if (showBurgerMenu) setShowBurgerMenu(false);
                    if (showSearchBar) {
                      setShowSearchBar(false);
                      return;
                    }
                    setShowSearchBar(true);
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
                    if (showSearchBar) setShowSearchBar(false);
                    if (showBurgerMenu) setShowBurgerMenu(false);
                  }}
                >
                  <MapIcon />
                </IconNavLink>
                <IconNavLink
                  to="/new"
                  onClick={() => {
                    if (showSearchBar) setShowSearchBar(false);
                    if (showBurgerMenu) setShowBurgerMenu(false);
                    if (creatingNewPin) {
                      setCreatingNewPin(false);
                      setMapModalMessage("");
                      return;
                    }
                    setMapModalMessage("Creating a new pin");
                    setCreatingNewPin(true);
                  }}
                >
                  <CreatePinIcon />
                </IconNavLink>
              </IconRow>
              <BurgerZone>
                <BurgerButton
                  onClick={() => {
                    setShowBurgerMenu(!showBurgerMenu);
                    if (showFilterMenu) setShowFilterMenu(false);
                    if (showSearchBar) setShowSearchBar(false);
                  }}
                >
                  {/* <BurgerMenuIcon /> */}
                  <TiThMenu />
                </BurgerButton>
              </BurgerZone>
            </>
          ) : (
            <LoginContainer>
              <LoginButton />
            </LoginContainer>
          )}
          <BurgerMenuPopout show={showBurgerMenu} />
          <NewPinModal
            show={showPinCreationModal || pinCreationSuccessful}
            type={!pinCreationSuccessful ? "creation" : "success"}
          />
          <SearchContainer show={showSearchBar} />
        </Content>
      </Wrapper>
    </Boundary>
  );
};

export default MenuBar;

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

const BurgerButton = styled.button`
  padding: unset;
  padding: 2px;
  margin-right: 3px;
  border-radius: 3px;
  height: fit-content;
  width: fit-content;
  border: none;
  background: none;
  outline: 1px solid var(--color-super-dark-grey);
  cursor: pointer;
  &:hover {
    background-color: var(--color-pink);
  }
  ${boxShadow}
`;

const BurgerZone = styled.div`
  ${centeredFlexRow}
  width: fit-content;
  svg {
    width: 35px;
    height: 35px;
    background-color: var(--color-dark-grey);
    fill: var(--color-medium-grey);
    border-radius: 3px;

    outline: 1px solid var(--color-less-dark-grey);
    &:active {
      background-color: var(--color-teal);
      transform: scale(0.95);
      outline: 2px solid var(--color-less-dark-grey);
    }
  }

  padding: 0px 10px;
`;

const Wrapper = styled.div`
  background-color: var(--color-darkest-grey);
  border-radius: 10px;
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
