import styled from 'styled-components/macro';
import { fillSpace } from '../../styling/sharedstyles';

import ResponsiveContainer from '../../styling/ResponsiveContainer';
import ChatSidebar from './components/ChatSidebar';

import { useContext, useEffect, useState } from 'react';
import { getUserThreads, getLatestThread } from './helpers';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { AppContext } from '../AppContext';

// Now that this is all sorted, I should move some stuff into a MessagingContext Provider
//TODO: probably don't use localStorage for threads because that could get wiiild

const Messaging = () => {
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
          // Assigning any threads in localstorage to locallyStoredThreads
          const locallyStoredThreads = JSON.parse(localStorage.getItem('locallyStoredThreads'));

          // If there are any locally stored threads, set them to allUserThreads
          if (locallyStoredThreads) {
            setAllUserThreads(locallyStoredThreads);
          }

          // Retrieve current threads from the database
          const retrievedThreads = await getUserThreads(loggedInUser._id);

          // If this is the first run of the session and there are no threads, set noThreads to true and return
          if (retrievedThreads.length === 0) {
            setNoThreads(true);
            return;
          }

          // Set retrieved threads to local storage
          localStorage.setItem('locallyStoredThreads', JSON.stringify(retrievedThreads));

          // Also update the state in case any new messages were added
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
  }, [currentMessages, noThreads, selectedThreadId, loggedInUser, loggedInUser._id]);

  return (
    <ResponsiveContainer>
      <Forehead />
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
          <ChatMessages currentMessages={currentMessages} setCurrentMessages={setCurrentMessages} />
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

export default Messaging;

const Forehead = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${(props) => props.theme.colors.darkestGrey}; ;
`;

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 3px;
  border-bottom-left-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  overflow: hidden;
`;

const ChatArea = styled.div`
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
