import styled from "styled-components";
import SendButton from "./SendButton";

const ChatInput = ({}) => {
  return (
    <ChatInputWrapper>
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
