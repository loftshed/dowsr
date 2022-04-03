import styled, { css } from "styled-components";
import { useState } from "react";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  UnstyledButton,
} from "./styles/StyledComponents";
import { CircledArrowRight } from "./styles/Icons";
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
      <Wrapper show={showSidebar}>
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
`;

const DrawerContents = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  height: 100%;
  background-color: var(--dark-blue);
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
          background-color: #4a4e69;
        `;
      default:
        return css`
          background-color: none;
        `;
    }
  }}
`;

const Button = styled(UnstyledButton)``;

const ShowMenuIcon = styled(CircledArrowRight)`
  cursor: pointer;
  fill: var(--color-pink);
  &:hover {
    fill: var(--color-dark-blue);
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
