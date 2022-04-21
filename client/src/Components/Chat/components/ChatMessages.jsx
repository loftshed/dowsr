import styled from "styled-components";
import Bubble from "./MessageBubble";
import ScrollToNewest from "./ScrollToNewest";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";

const ChatMessages = ({ currentMessages }) => {
  const { loggedInUser } = useContext(AppContext);

  if (!currentMessages) return null;

  return (
    <ChatMessagesWrapper>
      {currentMessages.map((el) => {
        // Maps through the currently selected messages and renders them
        return (
          <Bubble
            key={uuidv4()}
            recd={el.userId !== loggedInUser._id}
            author={el.handle}
            content={el.message}
            timestamp={el.sent}
          />
        );
      })}
      <ScrollToNewest />
    </ChatMessagesWrapper>
  );
};

export default ChatMessages;

const ChatMessagesWrapper = styled.ul`
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
