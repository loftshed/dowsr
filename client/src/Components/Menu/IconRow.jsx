import { centeredFlexRow, IconNavLink } from "../../styling/sharedstyles";
import {
  SearchIcon,
  MapIcon,
  ChatIcon,
  CreatePinIcon,
  ProfileIcon,
} from "../../styling/react-icons";
import { SIZES } from "../../styling/constants";
import styled from "styled-components";
import { MappingContext } from "../Home/Map/MappingContext";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

const IconRow = () => {
  const locallyStoredUsername = localStorage.getItem("username");
  const { showBurgerMenu, setShowBurgerMenu, showSearchBar, setShowSearchBar } =
    useContext(AppContext);
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
        to={`/profile/${locallyStoredUsername}`}
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
  @media (max-width: ${SIZES.widthMin}px) {
    gap: 3.5vw;
  }
  svg {
    width: ${SIZES.iconSize}px;
    height: ${SIZES.iconSize}px;
  }
  padding: 0px 10px;
`;