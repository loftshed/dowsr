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

// messaging capabilities
// get individual message?? or just a thread..

const Messages = () => {
  return (
    <ResponsiveContainer heading={"Messages"}>
      <LayoutContainer>
        <Sidebar>
          <ThreadTile user={"@jimjam"} children={"text"} />
        </Sidebar>
        <MessagesContainer>
          <Chat />
        </MessagesContainer>
      </LayoutContainer>
    </ResponsiveContainer>
  );
};

export default Messages;

const LayoutContainer = styled(FlexDiv)`
  width: 100%;
  height: 100%;
`;

const MessagesContainer = styled(CenteredFlexColumnDiv)`
  padding: 7.5px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const Sidebar = styled(FlexDiv)`
  align-self: flex-start;
  width: 45%;
  height: 100%;
  padding: 10px;
  border-bottom-left-radius: ${SIZES.borderRadius}px;
`;
