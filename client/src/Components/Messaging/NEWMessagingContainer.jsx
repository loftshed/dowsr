import styled from "styled-components";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";

import ResponsiveContainer from "../../styling/ResponsiveContainer";
import Sidebar from "./components/Sidebar";

import { useEffect, useState } from "react";
import { getUserThreads } from "./helpers";
import ChatMessages from "./components/NEWChatMessages";
import ChatInput from "./components/ChatInput";
import SendButton from "./components/SendButton";

const MessagingContainer = () => {
  const locallyStoredUsername = localStorage.getItem("username");
  const locallyStoredUserId = localStorage.getItem("userId");
  const [allUserThreads, setAllUserThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);

  // On mount, get all threads for storedUserId.
  useEffect(() => {
    (async () => {
      try {
        setAllUserThreads(await getUserThreads(locallyStoredUserId));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar
          setSelectedThread={setSelectedThread}
          allUserThreads={allUserThreads}
          storedUserId={locallyStoredUserId}
        />
        <ChatArea>
          <ChatMessages
            currentMessages={currentMessages}
            setCurrentMessages={setCurrentMessages}
          />
          <ChatInput />
        </ChatArea>
      </LayoutContainer>
    </ResponsiveContainer>
  );
};

export default MessagingContainer;

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 3px;
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  overflow: hidden;
`;

const ChatArea = styled.div`
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
