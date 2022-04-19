import styled from "styled-components";
import { fillSpace } from "../../../styling/sharedstyles";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { SIZES } from "../../../styling/constants";
import { replyThread, getOneThread, getUserThreads } from "../helpers";
import LoadingSpinner from "../../../styling/LoadingSpinner";
import { SendIcon } from "../../../styling/react-icons";
import ChatMessages from "../components/ChatMessages";
import SendButton from "../components/SendButton";
import ChatLoading from "../components/ChatLoading";
import socketio from "socket.io-client";

const ChatInterface = () => {
  const [currentMessages, setCurrentMessages] = useState([]);
  const [userHasNoThreads, setUserHasNoThreads] = useState(false);
  const socket = socketio.connect("http://localhost:8080");
  //listens for "newMessage" event from server
  socket.on("newMessage", (message) => {
    console.log(message);
    setCurrentMessages([...currentMessages, message]);
  });

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
    if (threads.length === 0 && !userHasNoThreads)
      (async () => {
        const { threads } = await getUserThreads(loggedInUser?._id);
        if (!threads) {
          setUserHasNoThreads(true);
          return;
        } else {
          setThreads(threads);
        }
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

  if (!currentMessages) return <ChatLoading />;

  return (
    <ChatWrapper>
      <ChatMessages
        displayedThreadId={displayedThreadId}
        currentMessages={currentMessages}
        loggedInUser={loggedInUser}
      />

      <InputArea
        onSubmit={(ev) => {
          ev.preventDefault(); //TODO: CLEAR INPUT ON SUBMIT
          handleSendMessage(ev.target.message.value);
          ev.target.message.value = "";
        }}
      >
        <ChatInput id="message" type="text" autoComplete="off"></ChatInput>
        <SendButton />
      </InputArea>
    </ChatWrapper>
  );
};

export default ChatInterface;

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
