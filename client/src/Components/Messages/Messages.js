import styled from "styled-components";
import ResponsiveContainer from "../ResponsiveContainer";
import AlertModal from "../AlertModal";
import { SIZES } from "../../Styling/constants";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
} from "../../Styling/StyledComponents";
import Chat from "./Chat";
import ThreadTile from "./ThreadTile";
import { useContext, useEffect, useState } from "react";
import { getThreads } from "./chatHelpers";
import { AppContext } from "../../Context/AppContext";

//TODO: by default, the most recent thread should be displayed.
//TODO: should be some type of indicator for threads with new messages.
//TODO: implement react-spring for scrolling through messages/threads

const Messages = () => {
  const {
    loggedInUser: { _id },
    threads,
    viewedThread,
  } = useContext(AppContext);

  const handleTileClick = (id) => {
    console.log(id);
  };

  if (threads.length < 1) return <div>loading</div>;

  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar>
          <>
            {threads.map((el) => {
              const { _id, messages } = el;
              const { sent, handle, message } = messages[messages.length - 1];
              return (
                <ThreadTile
                  key={_id}
                  id={_id}
                  user={`@${handle}`}
                  message={`${message}`}
                  time={sent}
                />
              );
            })}
          </>
        </Sidebar>
        <MessagesContainer>
          <Chat thread={viewedThread} />
        </MessagesContainer>
      </LayoutContainer>
    </ResponsiveContainer>
  );
};

export default Messages;

const LayoutContainer = styled(FlexDiv)`
  width: 100%;
  height: 100%;
  padding: 3px;
  /* column-gap: 2px; */
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  overflow: hidden;
`;

const MessagesContainer = styled(CenteredFlexColumnDiv)`
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const Sidebar = styled(FlexDiv)`
  align-self: flex-start;
  flex-direction: column;
  width: 45%;
  height: 100%;
  padding: 5px 2px 5px 5px;
  row-gap: 3px;
  background-color: var(--color-super-dark-grey);
  border-top-left-radius: 3px;
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  @media (max-width: 425px) {
    width: fit-content;
  }
  overflow: hidden;
  /* overflow-y: scroll; */
`;
