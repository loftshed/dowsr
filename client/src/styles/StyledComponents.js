import styled from "styled-components";
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

const UnstyledButton = styled.button`
  background-color: transparent;
  height: fit-content;
  width: fit-content;
  border-radius: none;
  border: none;
  margin: 0;
  padding: 0;
  transition: all ease 0.1s;
  cursor: pointer;
`;

const pageWidth = document.documentElement.clientWidth;

export {
  FlexDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  ContentGrid,
  FillDiv,
  AbsoluteDiv,
  UnstyledButton,
  pageWidth,
};
