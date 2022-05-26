import styled from "styled-components/macro";
import LoadingSpinner from "../../../styling/LoadingSpinner";
import SendButton from "./SendButton";
import { fillSpace } from "../../../styling/sharedstyles";

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
  background-color: ${(props) => props.theme.colors.superDarkGrey};
  border-top-right-radius: 5px;
  border-bottom-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
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
  background-color: ${(props) => props.theme.colors.darkestGrey};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #282828;
    box-shadow: 0px 0px 1px inset ${(props) => props.theme.colors.superDarkGrey};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => props.theme.colors.pink};
  }
`;

const ChatInput = styled.input`
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
