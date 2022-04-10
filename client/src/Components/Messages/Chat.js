import styled from "styled-components";
import { FillDiv } from "../../Styling/StyledComponents";
import { useState, useEffect, useContext } from "react";
import Bubble from "./Bubble";
import { AppContext } from "../../Context/AppContext";
import { SIZES } from "../../Styling/constants";
import { replyThread, getOneThread } from "./chatHelpers";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  const [currentThread, setCurrentThread] = useState(null);
  const {
    viewedThread,
    threads,
    loggedInUser: { _id, username },
  } = useContext(AppContext);

  // useEffect(() => {}, [third]);

  console.log(threads);

  const handleUpdateThread = () => {
    getOneThread("id", _id);
  };

  // const thread = threads.find((el) => {
  //   return el._id === viewedThread;
  // });
  // if (!thread) return null;

  //TODO: change this so that even if thread is null,
  // chat window displays the same way.
  //FIXME: something up with timestamps
  //FIXME: correct noob styling mistake... use shared styles, don't extend one component for eternity
  //TODO: get page to re-render properly when messages sent..

  // const { messages } = thread;

  const handleSendMessage = (message) => {
    replyThread(viewedThread, message, _id, username);
  };

  return (
    <ChatWrapper>
      <ChatBody>
        <>
          {/* {messages.map((el) => {
            return (
              <Bubble
                key={uuidv4()}
                recd={el.userId !== _id}
                author={`@${el.handle}`}
                content={el.message}
                timestamp={el.sent}
              />
            );
          })} */}
        </>
      </ChatBody>
      <InputArea
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSendMessage(ev.target.message.value);
        }}
      >
        <ChatInput id="message" type="text" autoComplete="off"></ChatInput>
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
  /* height: 600%; */
  background-color: var(--color-darkest-grey);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-teal);
    box-shadow: 0px 0px 1px inset var(--color-super-dark-grey);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-pink);
  }
  /* ::-webkit-scrollbar-thumb:hover {
    background: var(--color-pink);
  } */
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
  &:focus {
    outline: none;
    //TODO: change transparency on this
    box-shadow: inset 0px 0px 50px var(--color-teal);
  }
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
