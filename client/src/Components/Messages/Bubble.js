import styled from "styled-components";
import { FlexDiv } from "../../Styling/StyledComponents";

const Bubble = ({ recd, author, content }) => {
  return (
    <BubbleWrapper>
      <MessageContainer recd={recd}>
        <Heading recd={recd}>{recd && <>{author}</>}</Heading>
        <Body recd={recd}>{content}</Body>
      </MessageContainer>
    </BubbleWrapper>
  );
};

export default Bubble;

const BubbleWrapper = styled(FlexDiv)`
  flex-direction: column;
  width: 100%;
`;

const Heading = styled(FlexDiv)`
  font-family: Karla;
  font-weight: 800;
  color: var(--color-almost-darkest-blue);
  text-transform: lowercase;
  font-size: 14px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 0px 2px;
`;

const Body = styled(FlexDiv)`
  font-family: Karla;
  font-weight: 400;
  height: 100%;
  font-size: 16px;
  padding: 5px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.recd ? "var(--color-dark-blue)" : "var(--color-med-blue)"};
  /* border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: ${(props) => (props.recd ? "0px" : "3px")};
  border-top-right-radius: ${(props) => (props.recd ? "0px" : "3px")}; */
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
