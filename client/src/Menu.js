import styled, { css } from "styled-components";

import { NavLink } from "react-router-dom";

import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FillDiv,
  FlexDiv,
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

import { SIZES } from "./styles/constants";

const Menu = () => {
  return (
    <Wrapper>
      <Content>
        <IconRow>
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
      </Content>
    </Wrapper>
  );
};

export default Menu;

const Wrapper = styled(FlexDiv)`
  position: absolute;
  height: ${SIZES.menuHeightCompact}px;
  width: calc(100vw - 40px);
  bottom: 20px;
  z-index: 1;
`;
const Content = styled(FillDiv)`
  background-color: var(--color-medium-grey);
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
