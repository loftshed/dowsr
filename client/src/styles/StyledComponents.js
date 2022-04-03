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

const Wrapper = styled(FlexDiv)`
  width: 100%;
  padding: 0px 50px;
`;

const ContentGrid = styled(FlexDiv)`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(2, 100px);
  gap: 10px;
`;

export {
  FlexDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  ContentGrid,
  Wrapper,
};
