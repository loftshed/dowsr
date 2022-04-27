import { centeredFlexRow, IconNavLink } from "../../styling/sharedstyles";
import {
  SearchIcon,
  MapIcon,
  ChatIcon,
  CreatePinIcon,
  ProfileIcon,
} from "../../styling/react-icons";
import styled from "styled-components";
import { MappingContext } from "../Map/MappingContext";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const IconRow = () => {
  const {
    showBurgerMenu,
    setShowBurgerMenu,
    showSearchBar,
    setShowSearchBar,
    loggedInUser,
  } = useContext(AppContext);
  const {
    setMapModalMessage,
    setCreatingNewPin,
    creatingNewPin,
    // showPinCreationModal,
    pinCreationSuccessful,
    setPinCreationSuccessful,
  } = useContext(MappingContext);

  return (
    <IconRowWrapper>
      <IconNavLink
        to="/search"
        onClick={(ev) => {
          if (creatingNewPin) {
            setCreatingNewPin(false);
            setMapModalMessage("");
          }
          if (showBurgerMenu) setShowBurgerMenu(false);
          if (pinCreationSuccessful) setPinCreationSuccessful(null);
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
        to="/new"
        onClick={() => {
          if (showSearchBar) setShowSearchBar(false);
          if (showBurgerMenu) setShowBurgerMenu(false);
          if (pinCreationSuccessful) setPinCreationSuccessful(null);
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
      <IconNavLink
        to="/"
        onClick={() => {
          if (creatingNewPin) {
            setCreatingNewPin(false);
            setMapModalMessage("");
          }
          if (showSearchBar) setShowSearchBar(false);
          if (showBurgerMenu) setShowBurgerMenu(false);
          if (pinCreationSuccessful) setPinCreationSuccessful(null);
        }}
      >
        <MapIcon />
      </IconNavLink>
      <IconNavLink
        to="/messages"
        onClick={() => {
          if (creatingNewPin) {
            setCreatingNewPin(false);
            setMapModalMessage("");
          }
          if (showSearchBar) setShowSearchBar(false);
          if (showBurgerMenu) setShowBurgerMenu(false);
          if (pinCreationSuccessful) setPinCreationSuccessful(null);
        }}
      >
        <ChatIcon />
      </IconNavLink>
      <IconNavLink
        to={`/profile/${loggedInUser.username}`}
        onClick={() => {
          if (creatingNewPin) {
            setCreatingNewPin(false);
            setMapModalMessage("");
          }
          if (showSearchBar) setShowSearchBar(false);
          if (showBurgerMenu) setShowBurgerMenu(false);
          if (pinCreationSuccessful) setPinCreationSuccessful(null);
        }}
      >
        <ProfileIcon />
      </IconNavLink>
    </IconRowWrapper>
  );
};

export default IconRow;

const IconRowWrapper = styled.div`
  ${centeredFlexRow}
  width: fit-content;
  gap: 50px;
  @media (max-width: ${(props) => props.theme.sizes.widthMin}px) {
    gap: 3.5vw;
  }
  svg {
    width: ${(props) => props.theme.sizes.iconSize}px;
    height: ${(props) => props.theme.sizes.iconSize}px;
  }
  padding: 0px 10px;
`;
