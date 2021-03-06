import styled, { css } from "styled-components/macro";
import { NavLink } from "react-router-dom";

const buttonAnim = css`
  transition: all ease 0.1s;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.teal};
    transform: scale(1.05);
  }
  &:active {
    background-color: ${(props) => props.theme.colors.teal};
    transform: scale(0.95);
  }
`;

const fillSpace = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

const centeredFlexRow = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const centeredFlexColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const iconstyling = css`
  padding: 8px;
  background-color: #1e2021;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 50%;
  transition: all ease 0.1s;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.pink};
    transform: scale(1.05);
  }
  &:active {
    background-color: ${(props) => props.theme.colors.pink};
    transform: scale(0.95);
  }
`;

const inputStyling = css`
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  box-shadow: inset 0px 0px 10px ${(props) => props.theme.colors.darkestGrey};
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 5px 6px;
  border: 1px solid ${(props) => props.theme.colors.extraMediumGrey};
`;

const boxShadow = css`
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
`;

const textButtonstyling = css`
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: transparent;
  height: fit-content;
  width: fit-content;
  border-radius: none;
  border: none;
  margin: 0;
  padding: 0;
  transition: all ease 0.1s;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  outline: 1px ${(props) => props.theme.colors.lessDarkGrey} solid;
  ${buttonAnim}
  ${boxShadow}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(2, 100px);
  gap: 10px;
`;

const TextButton = styled.button`
  ${textButtonstyling}
`;

// vestigial
const IconNavLink = styled(NavLink)`
  ${iconstyling}
  ${boxShadow}
`;

const BurgerNavLink = styled(IconNavLink)``;

// vestigial
const Input = styled.input`
  ${inputStyling}
`;

const Select = styled.select`
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  box-shadow: inset 0px 0px 10px ${(props) => props.theme.colors.darkestGrey};
  padding: 5px 6px;
  width: 100%;
`;

const Option = styled.option`
  width: 100%;
`;

const N = 1;
const fakeStroke = css`
  text-shadow: ${N}px ${N}px ${(props) => props.theme.colors.superDarkGrey},
    -${N}px -${N}px ${(props) => props.theme.colors.superDarkGrey},
    ${N}px -${N}px ${(props) => props.theme.colors.superDarkGrey},
    -${N}px ${N}px ${(props) => props.theme.colors.superDarkGrey},
    -${N}px 0px ${(props) => props.theme.colors.superDarkGrey},
    ${N}px 0px ${(props) => props.theme.colors.superDarkGrey},
    0px -${N}px ${(props) => props.theme.colors.superDarkGrey},
    0px ${N}px ${(props) => props.theme.colors.superDarkGrey};
`;

const pageWidth = document.documentElement.clientWidth;

export {
  ContentGrid,
  TextButton,
  pageWidth,
  IconNavLink,
  Input,
  Select,
  Option,
  buttonAnim,
  fillSpace,
  centeredFlexColumn,
  centeredFlexRow,
  iconstyling,
  inputStyling,
  textButtonstyling,
  BurgerNavLink,
  boxShadow,
  fakeStroke,
};
