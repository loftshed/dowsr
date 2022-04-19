import styled from "styled-components";
import { fillSpace } from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";

import ResponsiveContainer from "../../styling/ResponsiveContainer";
import Sidebar from "./components/Sidebar";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getUserThreads, getLatestThread } from "./helpers";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

const MessagingContainer = () => {
  const locallyStoredUserId = localStorage.getItem("userId");
  const [allUserThreads, setAllUserThreads] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [showLoadingAnim, setShowLoadingAnim] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const retrievedThreads = await getUserThreads(locallyStoredUserId);
        const latestThread = await getLatestThread(retrievedThreads);
        setAllUserThreads(retrievedThreads);
        if (!selectedThreadId) {
          setSelectedThreadId(latestThread._id);
          setCurrentMessages(latestThread.messages);
        }
        console.log(retrievedThreads);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentMessages]);

  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar
          selectedThreadId={selectedThreadId}
          setSelectedThreadId={setSelectedThreadId}
          setCurrentMessages={setCurrentMessages}
          allUserThreads={allUserThreads}
          storedUserId={locallyStoredUserId}
          showLoadingAnim={showLoadingAnim}
        />
        <ChatArea>
          <ChatMessages
            currentMessages={currentMessages}
            setCurrentMessages={setCurrentMessages}
          />
          <ChatInput
            selectedThreadId={selectedThreadId}
            setShowLoadingAnim={setShowLoadingAnim}
            setCurrentMessages={setCurrentMessages}
            currentMessages={currentMessages}
          />
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
