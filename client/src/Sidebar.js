import styled, { css } from "styled-components";
import { useState } from "react";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  UnstyledButton,
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

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(null);

  return (
    <>
      <Wrapper
        onDoubleClick={() => {
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
          <IconRow brighten={showSidebar}>
            <MapIcon />
            <SearchIcon />
            <ProfileIcon />
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
  position: fixed;
  justify-content: space-between;
  background-color: var(--color-dark-blue);
  height: calc(100vh - var(--header-height));
  width: 200px;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  /* transition: all ease 0.2s; */
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
          transform: translateX(-148px);
        `;
    }
  }}
  border-right: 2px solid var(--color-green);
  box-shadow: 2.8px 1px 1.7px rgba(0, 0, 0, 0.022),
    6.7px 2.3px 4.1px rgba(0, 0, 0, 0.032),
    12.5px 4.4px 7.8px rgba(0, 0, 0, 0.04),
    22.3px 7.8px 13.8px rgba(0, 0, 0, 0.048),
    41.8px 14.6px 25.9px rgba(0, 0, 0, 0.058),
    100px 35px 62px rgba(0, 0, 0, 0.08);
`;

const DrawerContents = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  height: 100%;
  background-color: #444948;
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
  margin-top: -30px;
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
