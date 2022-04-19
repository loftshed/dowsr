import styled from "styled-components";
import SendButton from "./SendButton";
import { replyThread } from "../helpers";

const ChatInput = ({
  selectedThreadId,
  setShowLoadingAnim,
  setCurrentMessages,
  currentMessages,
}) => {
  // Username and userId are grabbed from localStorage
  const locallyStoredUsername = localStorage.getItem("username");
  const locallyStoredUserId = localStorage.getItem("userId");

  const handleSendMessage = async (message) => {
    try {
      // When sending a message, arbitrarily display my fun animation
      setShowLoadingAnim(true);

      // Send the message to the server and get the response
      const response = await replyThread(
        selectedThreadId,
        message,
        locallyStoredUserId,
        locallyStoredUsername
      );

      // Add the response to the current messages
      setCurrentMessages([...currentMessages, response]);

      // Reset the loading animation
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
        // If the message is empty don't send it to the server
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
