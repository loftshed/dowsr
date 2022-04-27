import { SIZES } from "../../styling/constants";
import styled, { css } from "styled-components";
import { textButtonstyling } from "../../styling/sharedstyles";

const BAR_HEIGHT = {
  large: 40,
  small: 35,
};

const sharedDetailStyle = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 100%;
  height: ${BAR_HEIGHT.small}px;
  gap: 3px;
  padding: 0 ${SIZES.universalPadding}px;
  border-top: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  @media (min-width: 450px) {
    padding: 5px 40px;
    height: ${BAR_HEIGHT.large}px;
    font-size: 22px;
  }
`;

const ProfileButton = styled.button`
  ${textButtonstyling}
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 3px;
  padding: 0px 5px;
  gap: 4px;
  cursor: pointer;
  @media (min-width: 450px) {
    width: 270px;
  }
  @media (max-width: 450px) {
    font-size: 16px;
  }
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;

export { sharedDetailStyle, ProfileButton, BAR_HEIGHT };
