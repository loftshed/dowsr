import styled from "styled-components";
import ResponsiveContainer from "../ResponsiveContainer";
import { SIZES } from "../../Styling/constants";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
} from "../../Styling/StyledComponents";
import Chat from "./Chat";
import ThreadTile from "./ThreadTile";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

import { getUser } from "../Auth/userHelpers";

//TODO: by default, the most recent thread should be displayed.
//TODO: use userefs for that?

//TODO: should be some type of indicator for threads with new messages.
//TODO: implement react-spring for scrolling through messages/threads

const Messages = () => {
  const { loggedInUser, threads, displayedThreadId } = useContext(AppContext);
  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar>
          <>
            {threads.map((el) => {
              const { _id, messages } = el;
              const partnerMsg = messages.find((el) => {
                return el.handle !== loggedInUser.username;
              });
              const mostRecentMessage = messages[messages.length - 1];
              const { sent, message } = mostRecentMessage;
              return (
                <ThreadTile
                  key={_id}
                  threadId={_id}
                  user={`@${partnerMsg.handle}`}
                  message={`${message}`}
                  time={sent}
                  userId={partnerMsg.userId}
                />
              );
            })}
          </>
        </Sidebar>
        <MessagesContainer>
          <Chat thread={displayedThreadId} />
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
