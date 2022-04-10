import styled from "styled-components";
import { FillDiv } from "../../Styling/StyledComponents";
import { useState, useEffect, useContext } from "react";
import Bubble from "./Bubble";
import { AppContext } from "../../Context/AppContext";
import { SIZES } from "../../Styling/constants";

const Chat = () => {
  // const { socket } = useContext(AppContext);
  const [joined, setJoined] = useState(false);

  // useEffect(() => {
  //   socket.on("connection");
  // }, [socket]);

  return (
    <ChatWrapper>
      <ChatBody>
        <Bubble author={"@loftshed"} content={"waddayat there budday?"} />
        <Bubble recd={true} author={"@coolguy420"} content={"nudding b'y"} />
      </ChatBody>
      <InputArea
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(ev.target.message.value);
        }}
      >
        <ChatInput id="message" type="text"></ChatInput>
        <SendButton id="send" type="submit" value="Send" />
      </InputArea>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(FillDiv)`
  flex-direction: column;
  background-color: var(--color-super-dark-grey);
  border-top-right-radius: 5px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
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
  overflow: hidden;
`;

const InputArea = styled.form`
  display: flex;
  height: 40px;
  width: 100%;
  gap: 3px;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 5px;
  background-color: var(--color-less-dark-grey);
  border: 1px solid var(--color-darkest-grey);
  line-height: 30px;
  border-radius: 5px;
`;

const SendButton = styled.input`
  font-weight: 600;
  cursor: pointer;
  color: white;
  background-color: var(--color-darkest-grey);
  width: fit-content;
  border-radius: 5px;
  border: none;
  height: 100%;
  padding: 2px 10px;
  transition: all 0.1s ease;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  &:hover {
    background-color: var(--color-teal);
  }
  &:active {
    background-color: var(--color-pink);
    transform: scale(0.95);
  }
`;
