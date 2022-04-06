import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  UnstyledButton,
  pageWidth,
} from "./styles/StyledComponents";
import {
  CircledArrowRight,
  SearchIcon,
  MapIcon,
  HeartIcon,
  SavedHeartIcon,
  NotificationIcon,
  ChatIcon,
  ProfileIcon,
} from "./styles/Icons";
import {
  rotate180,
  unrotate180,
  drawerIn,
  drawerOut,
} from "./styles/Animations";
import { SIZES } from "./styles/constants";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(null);
  const enableSidebarToggle = useWindowWidth({ wait: 5 }) <= SIZES.widthMedPx;
  // if (!enableSidebarToggle) setShowSidebar("false");

  return (
    <>
      <Wrapper
        onDoubleClick={() => {
          if (enableSidebarToggle)
            showSidebar === "false" || showSidebar === null
              ? setShowSidebar("true")
              : setShowSidebar("false");
        }}
        show={showSidebar}
      >
        <DrawerContents>
          <p>stuff</p>
          <p>stuff</p>
          <p>stuff</p>
          <p>stuff</p>
          <p>stuff</p>
        </DrawerContents>
        <DrawerEdge show={showSidebar}>
          {enableSidebarToggle && (
            <Button>
              <ShowMenuIcon
                anim={showSidebar}
                onClick={() => {
                  showSidebar === "false" || showSidebar === null
                    ? setShowSidebar("true")
                    : setShowSidebar("false");
                }}
              />
            </Button>
          )}
          <IconRow brighten={showSidebar}>
            <NavLink to="/">
              <MapIcon />
            </NavLink>
            <SearchIcon />
            <NavLink to="/profile">
              <ProfileIcon />
            </NavLink>
            <NotificationIcon />
            <ChatIcon />
            <HeartIcon />
          </IconRow>
        </DrawerEdge>
      </Wrapper>
    </>
  );
};

export default Sidebar;

const Wrapper = styled(CenteredFlexRowDiv)`
  position: absolute;
  justify-content: space-between;
  background-color: var(--color-dark-blue);
  height: calc(100vh - var(--header-height));
  width: 200px;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  /* transition: all ease 0.2s; */

  @media (max-width: ${SIZES.widthMin}) {
    height: calc(100vh - var(--sml-header-height));
  }

  ${(props) => {
    switch (props.show) {
      case "true":
        return css`
          animation: ${drawerOut} ease 0.2s forwards;
        `;
      case "false":
        return css`
          animation: ${drawerIn} ease 0.2s forwards;
        `;
      default:
        return css`
          @media (min-width: ${SIZES.widthMax}) {
            transform: translateX(calc(-1 * (100vw - var(--width-max)) / 2));
            width: calc((100vw - var(--width-max)) / 2);
          }
          transform: translateX(-150px);
        `;
    }
  }}
  border-right: 2px solid var(--color-green);
  box-shadow: 0.3px 0.9px 5px rgba(0, 0, 0, 0.05),
    0.9px 2.2px 12.6px rgba(0, 0, 0, 0.071),
    1.8px 4.4px 25.7px rgba(0, 0, 0, 0.089),
    3.7px 9.1px 52.9px rgba(0, 0, 0, 0.11), 10px 25px 145px rgba(0, 0, 0, 0.16);
`;

const DrawerContents = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  height: 100%;
  background-color: var(--color-less-dark-grey);
`;

const DrawerEdge = styled(CenteredFlexColumnDiv)`
  height: 100%;
  padding: 20px 0px;
  justify-content: flex-start;
  align-self: flex-end;
  width: 50px;
  transition: ease 0.3s;
  ${(props) => {
    switch (props.show) {
      case "true":
        return css`
          background-color: #353535;
        `;
      default:
        return css`
          background-color: none;
        `;
    }
  }}
`;

const IconRow = styled(CenteredFlexColumnDiv)`
  height: 100%;
  @media (max-width: ${SIZES.widthMed}) {
    margin-top: -30px;
  }

  row-gap: 50px;
  & * {
    fill: #05161c;
    cursor: pointer;
    &:hover {
      fill: #fff;
    }
  }

  ${(props) => {
    switch (props.brighten) {
      case "true":
        return css`
          & * {
            fill: #fff;
            &:hover {
              fill: var(--color-yellow);
            }
          }
        `;
      default:
        return css``;
    }
  }}
`;

const Button = styled(UnstyledButton)``;

const ShowMenuIcon = styled(CircledArrowRight)`
  display: fixed;
  cursor: pointer;
  fill: var(--color-pink);
  &:hover {
    fill: white;
  }
  &:hover {
    fill: white;
  }
  ${(props) => {
    switch (props.anim) {
      case "true":
        return css`
          animation: ${rotate180} ease 0.3s forwards;
        `;
      case "false":
        return css`
          animation: ${unrotate180} ease 0.3s forwards;
        `;
      default:
        return css`
          animation: none;
        `;
    }
  }}
`;
