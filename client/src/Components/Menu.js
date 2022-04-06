import styled, { css } from "styled-components";

import { NavLink } from "react-router-dom";

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

import { SIZES } from "../styles/constants";

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
          <NavLink to="/notifications">
            <NotificationIcon />
          </NavLink>
          <ChatIcon />
          <HeartIcon />
        </IconRow>
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
  padding: 0px 10px;
  background-color: #353535;
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
    gap: 6vw;
  }
  & * {
    fill: var(--color-darkest-blue);
    cursor: pointer;
    &:hover {
      fill: #fff;
    }
  }
`;
