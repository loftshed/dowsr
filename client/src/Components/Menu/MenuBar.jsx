import {
  boxShadow,
  centeredFlexRow,
  fillSpace,
} from "../../styling/sharedstyles";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components/macro";
import LoginButton from "../Auth/LoginButton";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../AppContext";
import { MappingContext } from "../Map/MappingContext";
import { TiThMenu as BurgerMenuIcon } from "react-icons/ti";
import MenuPopout from "./MenuPopout";
import NewPinModal from "../Map/PinCreation/NewPinModal";
import SearchContainer from "./SearchContainer";
import IconRow from "./IconRow";

const MenuBar = () => {
  const { showBurgerMenu, setShowBurgerMenu, showSearchBar, setShowSearchBar } =
    useContext(AppContext);
  const {
    setShowFilterMenu,
    showFilterMenu,
    showPinCreationModal,
    pinCreationSuccessful,
    setPinCreationSuccessful,
    // newPinData,
    // setNewPinData,
  } = useContext(MappingContext);
  const [searchResults, setSearchResults] = useState(null);

  const { isAuthenticated } = useAuth0();

  return (
    <Boundary>
      <Wrapper>
        <Content>
          {isAuthenticated ? (
            <>
              <IconRow
                searchResults={searchResults}
                setSearchResults={setSearchResults}
              />
              <BurgerZone>
                <BurgerButton
                  onClick={() => {
                    setShowBurgerMenu(!showBurgerMenu);
                    if (showFilterMenu) setShowFilterMenu(false);
                    if (showSearchBar) setShowSearchBar(false);
                    if (pinCreationSuccessful) setPinCreationSuccessful(null);
                  }}
                >
                  <BurgerMenuIcon />
                </BurgerButton>
              </BurgerZone>
            </>
          ) : (
            <LoginContainer>
              <LoginButton />
            </LoginContainer>
          )}
          <MenuPopout show={showBurgerMenu} />
          <NewPinModal
            show={showPinCreationModal || pinCreationSuccessful}
            type={!pinCreationSuccessful ? "creation" : "success"}
          />
          <SearchContainer
            show={showSearchBar}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
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
  bottom: ${(props) => props.theme.sizes.topBottomPadding}px;
  @media (max-width: ${(props) => props.theme.sizes.widthMin}px) {
    width: calc(100% - ${(props) => props.theme.sizes.smallPadding}px*2);
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
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.pink};
  }
  ${boxShadow}
`;

const BurgerZone = styled.div`
  ${centeredFlexRow}
  width: fit-content;
  svg {
    width: 35px;
    height: 35px;
    background-color: ${(props) => props.theme.colors.darkGrey};
    fill: ${(props) => props.theme.colors.mediumGrey};
    border-radius: 3px;

    outline: 1px solid ${(props) => props.theme.colors.lessDarkGrey};
    &:active {
      background-color: ${(props) => props.theme.colors.teal};
      transform: scale(0.95);
      outline: 2px solid ${(props) => props.theme.colors.lessDarkGrey};
    }
  }

  padding: 0px 10px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: 10px;
  ${centeredFlexRow}
  width: 100%;
  z-index: 100;
`;

const Content = styled.div`
  position: relative;
  ${fillSpace}
  width: 525px;
  height: ${(props) => props.theme.sizes.menuHeightCompact}px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: 10px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07),
    inset 0px 0px 2px ${(props) => props.theme.colors.superDarkGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  justify-content: flex-end;
`;

const LoginContainer = styled.div`
  ${centeredFlexRow}
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;
