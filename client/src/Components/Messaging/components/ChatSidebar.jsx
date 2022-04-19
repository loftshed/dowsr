import styled from "styled-components";
import PreviewTile from "./PreviewTile";
import { SIZES } from "../../../styling/constants";

const ChatSidebar = ({
  allUserThreads,
  storedUserId,
  showLoadingAnim,
  setCurrentMessages,
  selectedThreadId,
  setSelectedThreadId,
}) => {
  return (
    <SidebarWrapper>
      {allUserThreads.map((thread) => {
        const { _id, messages, users } = thread;
        const partnerId = users.find((el) => {
          return el !== storedUserId;
        });
        const mostRecentMessage = messages[messages.length - 1];
        const { sent, message } = mostRecentMessage;

        return (
          <PreviewTile
            key={_id}
            threadId={_id}
            partnerId={partnerId}
            message={`${message}`}
            time={sent}
            setCurrentMessages={setCurrentMessages}
            setSelectedThreadId={setSelectedThreadId}
            selectedThreadId={selectedThreadId}
            showLoadingAnim={showLoadingAnim}
          />
        );
      })}
    </SidebarWrapper>
  );
};

export default ChatSidebar;

const SidebarWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 45%;
  height: 100%;
  padding: 5px 2px 5px 5px;
  row-gap: 6px;
  background-color: var(--color-super-dark-grey);
  border-top-left-radius: 3px;
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  @media (max-width: 425px) {
    width: 70px;
    row-gap: 10px;
  }
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #282828;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-pink);
  }
`;
