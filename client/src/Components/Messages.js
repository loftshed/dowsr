import styled from "styled-components";
import ResponsiveContainer from "./ResponsiveContainer";
import AlertModal from "./AlertModal";
import { SIZES } from "../styles/constants";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
} from "../styles/StyledComponents";

// messaging capabilities
// get individual message?? or just a thread..

const Messages = () => {
  return (
    <ResponsiveContainer heading={"Messages"}>
      <MessagesContainer>
        <AlertModal>@coolguy69 says: "ride later?"</AlertModal>
        <AlertModal>@bikeman420 says: "so friggin nice out today!"</AlertModal>
      </MessagesContainer>
    </ResponsiveContainer>
  );
};

export default Messages;

const MessagesContainer = styled(CenteredFlexColumnDiv)`
  padding: ${SIZES.universalPadding}px;
  border-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
