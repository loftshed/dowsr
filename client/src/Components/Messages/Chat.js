import styled from "styled-components";
import {
  CenteredFlexColumnDiv,
  FlexDiv,
  FillDiv,
  TextButton,
} from "../../Styling/StyledComponents";

import Bubble from "./Bubble";

const Chat = () => {
  return (
    <ChatWrapper>
      <ChatBody>
        <Bubble author={"@loftshed"} content={"waddayat there budday?"} />
        <Bubble recd={true} author={"@coolguy420"} content={"nudding b'y"} />
      </ChatBody>
      <InputArea>
        <ChatInput></ChatInput>
        <SendButton>Send</SendButton>
      </InputArea>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(FillDiv)`
  flex-direction: column;
  background-color: var(--color-super-dark-grey);
  border-radius: 5px;
  padding: 3px;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

const ChatBody = styled(FillDiv)`
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  height: 100%;
  background-color: var(--color-darkest-grey);
`;

const InputArea = styled(FillDiv)`
  height: 40px;
  width: 100%;
  /* padding: 3px; */
  gap: 5px;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 5px;
  background-color: var(--color-less-dark-grey);
  border: px solid var(--color-darkest-grey);
  line-height: 30px;
  border-radius: 5px;
`;

const SendButton = styled(TextButton)`
  border-radius: 3px;
  border: none;
  height: 95%;
  padding: 2px 10px;
`;
