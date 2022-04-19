import styled from "styled-components";
import SendButton from "./SendButton";
import { replyThread, getOneThread } from "../helpers";

const ChatInput = ({
  selectedThreadId,
  setShowLoadingAnim,
  setCurrentMessages,
  currentMessages,
}) => {
  const locallyStoredUsername = localStorage.getItem("username");
  const locallyStoredUserId = localStorage.getItem("userId");

  const handleSendMessage = async (message) => {
    try {
      setShowLoadingAnim(true);
      const response = await replyThread(
        selectedThreadId,
        message,
        locallyStoredUserId,
        locallyStoredUsername
      );
      setCurrentMessages([...currentMessages, response]);
      setShowLoadingAnim(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatInputWrapper
      onSubmit={(ev) => {
        ev.preventDefault();
        const message = ev.target.message.value;
        if (message !== "") {
          handleSendMessage(message);
          ev.target.message.value = "";
        }
      }}
    >
      <MessageInput id="message" type="text" autoComplete="off" />
      <SendButton />
    </ChatInputWrapper>
  );
};

export default ChatInput;

const ChatInputWrapper = styled.form`
  display: flex;
  height: 40px;
  width: 100%;
  gap: 3px;
  input {
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
  }
`;
const MessageInput = styled.input`
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
