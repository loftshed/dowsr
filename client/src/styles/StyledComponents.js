import styled from "styled-components";

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

const BodyPadding = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  padding: 0px 50px;
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
`;

export {
  FlexDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  ContentGrid,
  BodyPadding,
  UnstyledButton,
};
