import styled from "styled-components";
import { fillSpace } from "../../Styling/StyledComponents";
import { useState, useEffect, useContext } from "react";
import Bubble from "./Bubble";
import { AppContext } from "../../Context/AppContext";
import { SIZES } from "../../Styling/constants";
import { replyThread, getOneThread, getUserThreads } from "./chatHelpers";
import { v4 as uuidv4 } from "uuid";
import ScrollToNewest from "./ScrollToNewest";
import LoadingSpinner from "../Etc/LoadingSpinner";
import ResponsiveContainer from "../../Styling/ResponsiveContainer";

//TODO: Make threads sort properly by latest. Will need to determine latest thread by message timestamps instead 💩
//TODO: change this so that even if thread is null, chat window displays the same way.

const Chat = () => {
  const [currentMessages, setCurrentMessages] = useState([]);

  const {
    setThreads,
    setDisplayedThreadId,
    displayedThreadId,
    threads,
    loggedInUser,
    setShowLoadingAnim,
    showLoadingAnim,
  } = useContext(AppContext);

  useEffect(() => {
    if (!loggedInUser) return;
    if (threads.length === 0)
      (async () => {
        const { threads } = await getUserThreads(loggedInUser?._id);
        setThreads(threads);
      })();
  }, [threads, loggedInUser]);

  useEffect(() => {
    if (threads.length > 0) {
      (async () => {
        const latestThread = await threads[threads.length - 1];
        if (!displayedThreadId) setDisplayedThreadId(latestThread?._id);
        const retrievedMessages = await getOneThread(
          displayedThreadId || latestThread?._id
        );
        setCurrentMessages(retrievedMessages);
      })();
    }
  }, [displayedThreadId, threads]);

  if (!loggedInUser) return <LoadingSpinner size={60} />;

  const handleSendMessage = async (message) => {
    try {
      if (message !== "") {
        const returnMessage = await replyThread(
          displayedThreadId,
          message,
          loggedInUser._id,
          loggedInUser.username
        );
        setShowLoadingAnim(true);
        setCurrentMessages([...currentMessages, returnMessage]);
        const { threads } = await getUserThreads(loggedInUser?._id);
        setThreads(threads);
        setShowLoadingAnim(false);
      }
    } catch (error) {
      if (error) console.log(error);
    }
  };

  if (!currentMessages) return;
  <ChatWrapper>
    <ChatBody>
      <LoadingSpinner size={60} />
    </ChatBody>
    <InputArea>
      <ChatInput disabled={true}></ChatInput>
      <SendButton disabled={true} />
    </InputArea>
  </ChatWrapper>;

  return (
    <ChatWrapper>
      <ChatBody>
        <>
          {currentMessages.map((el) => {
            return (
              <Bubble
                key={uuidv4()}
                recd={el.userId !== loggedInUser._id}
                author={`@${el.handle}`}
                content={el.message}
                timestamp={el.sent}
              />
            );
          })}
        </>
        <ScrollToNewest />
      </ChatBody>
      <InputArea
        onSubmit={(ev) => {
          ev.preventDefault(); //TODO: CLEAR INPUT ON SUBMIT
          handleSendMessage(ev.target.message.value);
          ev.target.message.value = "";
        }}
      >
        <ChatInput id="message" type="text" autoComplete="off"></ChatInput>
        <SendButton id="send" type="submit" value="Send" />
      </InputArea>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  ${fillSpace}
  flex-direction: column;
  background-color: var(--color-super-dark-grey);
  border-top-right-radius: 5px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  padding: 3px;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

const ChatBody = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  padding: 6px 2px;
  width: 100%;
  height: 100%;
  background-color: var(--color-darkest-grey);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #282828;
    box-shadow: 0px 0px 1px inset var(--color-super-dark-grey);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--color-pink);
  }
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
    outline: 1px solid var(--color-teal);
    //TODO: change transparency on this
    box-shadow: inset 0px 0px 50px rgba(68, 187, 164, 0.2);
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
