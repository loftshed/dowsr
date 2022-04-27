import styled from "styled-components";
import SendButton from "./SendButton";
import { replyThread } from "../helpers";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

const ChatInput = ({
  selectedThreadId,
  setShowLoadingAnim,
  setCurrentMessages,
  currentMessages,
}) => {
  const { loggedInUser } = useContext(AppContext);
  const handleSendMessage = async (message) => {
    try {
      // When sending a message, arbitrarily display my fun animation
      setShowLoadingAnim(true);

      // Send the message to the server and get the response
      const response = await replyThread(
        selectedThreadId,
        message,
        loggedInUser._id,
        loggedInUser.username
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
    background-color: ${(props) => props.theme.colors.lessDarkGrey};
    border: 1px solid ${(props) => props.theme.colors.darkestGrey};
    line-height: 30px;
    border-radius: 5px;
    &:focus {
      outline: 1px solid ${(props) => props.theme.colors.teal};
      //TODO: change transparency on this
      box-shadow: inset 0px 0px 50px rgba(68, 187, 164, 0.2);
    }
  }
`;
const MessageInput = styled.input`
  width: 100%;
  padding: 5px;
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  border: 1px solid ${(props) => props.theme.colors.darkestGrey};
  line-height: 30px;
  border-radius: 5px;
  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.teal};
    //TODO: change transparency on this
    box-shadow: inset 0px 0px 50px rgba(68, 187, 164, 0.2);
  }
`;
