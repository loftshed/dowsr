import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { SIZES } from "./constants";

const buttonAnim = css`
  transition: all ease 0.1s;
  cursor: pointer;
  &:hover {
    background-color: var(--color-teal);
    transform: scale(1.05);
  }
  &:active {
    background-color: var(--color-teal);
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

const iconStyling = css`
  padding: 8px;
  background-color: #1e2021;
  border: 1px solid var(--color-super-dark-grey);
  border-radius: 50%;
  transition: all ease 0.1s;
  cursor: pointer;
  &:hover {
    background-color: var(--color-pink);
    transform: scale(1.05);
  }
  &:active {
    background-color: var(--color-pink);
    transform: scale(0.95);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(2, 100px);
  gap: 10px;
`;

const TextButton = styled.button`
  border-radius: ${SIZES.borderRadius}px;
  background-color: transparent;
  height: fit-content;
  width: fit-content;
  border-radius: none;
  border: none;
  margin: 0;
  padding: 0;
  transition: all ease 0.1s;
  background-color: var(--color-darkest-grey);
  outline: 1px var(--color-less-dark-grey) solid;
  ${buttonAnim}
`;

const IconNavLink = styled(NavLink)`
  ${iconStyling}
`;

const Input = styled.input`
  border-radius: 4px;
  background-color: var(--color-dark-grey);
  box-shadow: inset 0px 0px 10px var(--color-darkest-grey);
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 5px 6px;
  border: 1px solid var(--color-extra-medium-grey);
`;

const Select = styled.select`
  border-radius: 4px;
  background-color: var(--color-dark-grey);
  box-shadow: inset 0px 0px 10px var(--color-darkest-grey);
  padding: 5px 6px;
  width: 100%;
`;

const Option = styled.option`
  width: 100%;
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
  iconStyling,
};
