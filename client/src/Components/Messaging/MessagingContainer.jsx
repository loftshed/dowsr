import styled from "styled-components";
import { fillSpace } from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";

import ResponsiveContainer from "../../styling/ResponsiveContainer";
import ChatSidebar from "./components/ChatSidebar";

import { useContext, useEffect, useState } from "react";
import { getUserThreads, getLatestThread } from "./helpers";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { AppContext } from "../../AppContext";

// Now that this is all sorted, I should move some stuff into a MessagingContext Provider

const MessagingContainer = () => {
  const { loggedInUser } = useContext(AppContext);
  const [allUserThreads, setAllUserThreads] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [showLoadingAnim, setShowLoadingAnim] = useState(false);
  const [noThreads, setNoThreads] = useState(false);

  // On load, retrieve all threads for the locally stored userId

  useEffect(() => {
    (async () => {
      try {
        // If we have previously found that there are no threads, don't bother trying to get them again
        if (!noThreads && loggedInUser) {
          const retrievedThreads = await getUserThreads(loggedInUser._id);
          if (retrievedThreads.length === 0) {
            // If this is the first run of the session and there are no threads, set noThreads to true and return
            setNoThreads(true);
            return;
          }
          // If we have threads, set them to the state.
          setAllUserThreads(retrievedThreads);

          // If no thread id has been selected, load the most recent thread.
          if (!selectedThreadId) {
            const latestThread = await getLatestThread(retrievedThreads);
            setSelectedThreadId(latestThread._id);
            setCurrentMessages(latestThread.messages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentMessages, noThreads, selectedThreadId, loggedInUser._id]);

  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <ChatSidebar
          selectedThreadId={selectedThreadId}
          setSelectedThreadId={setSelectedThreadId}
          setCurrentMessages={setCurrentMessages}
          currentMessages={currentMessages}
          allUserThreads={allUserThreads}
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
