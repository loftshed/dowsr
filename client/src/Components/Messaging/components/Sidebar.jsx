import styled from "styled-components";
import ThreadPreviewTile from "./NEWThreadPreviewTile";
import { SIZES } from "../../../styling/constants";

const Sidebar = ({ allUserThreads, storedUserId }) => {
  return (
    <SidebarWrapper>
      {allUserThreads.map((el) => {
        const { _id, messages, users } = el;
        const partnerId = users.find((el) => {
          return el !== storedUserId;
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
    </SidebarWrapper>
  );
};

export default Sidebar;

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
