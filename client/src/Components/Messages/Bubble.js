import styled from "styled-components";
import { FlexDiv } from "../../Styling/StyledComponents";

const Bubble = ({ recd, author, content }) => {
  return (
    <BubbleWrapper>
      <MessageContainer recd={recd}>
        <Heading>{author}</Heading>
        <Body>{content}</Body>
      </MessageContainer>
    </BubbleWrapper>
  );
};

export default Bubble;

const BubbleWrapper = styled(FlexDiv)`
  flex-direction: column;
  width: 100%;
  height: 60px;
`;

const Heading = styled(FlexDiv)`
  background-color: var(--color-almost-darkest-blue);
  text-transform: uppercase;
  font-size: 12px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 0px 4px;
`;

const Body = styled(FlexDiv)`
  height: 100%;
  border: 1px solid var(--color-almost-darkest-blue);
  font-size: 14px;
  padding: 0px 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const MessageContainer = styled(FlexDiv)`
  flex-direction: column;
  height: 100%;
  width: 60%;
  padding: 2px;
  background-color: ${(props) =>
    props.recd ? "var(--color-med-blue)" : "var(--color-dark-grey)"};
  border-radius: 3px;
  align-self: ${(props) => (props.recd ? "flex-start" : "flex-end")};
`;
