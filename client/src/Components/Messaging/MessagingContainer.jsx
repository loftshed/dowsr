import styled from "styled-components";
import { centeredFlexColumn } from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";

import { useContext } from "react";
import { AppContext } from "../../AppContext";

import ResponsiveContainer from "../../styling/ResponsiveContainer";
import ThreadPreviewTile from "./ThreadPreviewTile";
import ChatInterface from "./ChatInterface";

const MessagingContainer = () => {
  const { loggedInUser, threads, displayedThreadId } = useContext(AppContext);

  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar>
          <>
            {threads.map((el) => {
              const { _id, messages, users } = el;
              const partnerId = users.find((el) => {
                return el !== loggedInUser._id;
              });
              const mostRecentMessage = messages[messages.length - 1];
              const { sent, message } = mostRecentMessage;
              return (
                <ThreadPreviewTile
                  key={_id}
                  threadId={_id}
                  message={`${message}`}
                  time={sent}
                  userId={partnerId}
                />
              );
            })}
          </>
        </Sidebar>
        <MessagesContainer>
          <ChatInterface thread={displayedThreadId} />
        </MessagesContainer>
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

const MessagesContainer = styled.div`
  ${centeredFlexColumn}
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const Sidebar = styled.div`
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
