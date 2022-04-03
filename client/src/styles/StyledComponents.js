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

export { FlexDiv, CenteredFlexColumnDiv, CenteredFlexRowDiv, Wrapper };
