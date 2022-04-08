import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SIZES } from "./constants";

const FlexDiv = styled.div`
  display: flex;
`;

const CenteredFlexRowDiv = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
`;

const CenteredFlexColumnDiv = styled(CenteredFlexRowDiv)`
  flex-direction: column;
`;

const FillDiv = styled(FlexDiv)`
  width: 100%;
  height: 100%;
`;

const AbsoluteDiv = styled(FlexDiv)`
  position: absolute;
`;

const ContentGrid = styled(FlexDiv)`
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

const IconNavLink = styled(NavLink)`
  padding: 8px;
  background-color: #1e2021;
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

const Input = styled.input`
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-dark-grey);
  font-weight: 600;
  line-height: 25px;
  padding: 5px 10px;
  border: 1px solid var(--color-extra-medium-grey);
`;

const pageWidth = document.documentElement.clientWidth;

export {
  FlexDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  ContentGrid,
  FillDiv,
  AbsoluteDiv,
  TextButton,
  pageWidth,
  IconNavLink,
  Input,
};
