import styled from "styled-components";
import LoadingSpinner from "../../../styling/LoadingSpinner";
import SendButton from "./SendButton";
import { fillSpace } from "../../../styling/sharedstyles";
import { SIZES } from "../../../styling/constants";

const ChatLoading = () => {
  // If everything is loading just show this
  return (
    <ChatLoadingWrapper>
      <ChatBody>
        <LoadingSpinner size={60} />
      </ChatBody>
      <InputArea>
        <ChatInput disabled={true}></ChatInput>
        <SendButton disabled={true} />
      </InputArea>
    </ChatLoadingWrapper>
  );
};

export default ChatLoading;

const ChatLoadingWrapper = styled.div`
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
