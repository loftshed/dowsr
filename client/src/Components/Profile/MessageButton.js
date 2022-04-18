import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { startThreadWithUser } from "../Messaging/helpers";
import {
  RiUserFollowLine as FollowIcon,
  RiUserUnfollowLine as UnfollowIcon,
} from "react-icons/ri";
import { SendIcon } from "../../styling/react-icons";
import { TextButton } from "../../styling/sharedstyles";

const MessageButton = ({ loggedInUser, _id }) => {
  const navigate = useNavigate();

  return (
    <MessageButtonWrapper
      onClick={async () => {
        const result = await startThreadWithUser(
          loggedInUser._id,
          _id,
          "👋",
          loggedInUser.username
        );
        navigate("/messages", { replace: true });
      }}
    >
      <span>Message</span>
      <SendIcon style={{ display: "inline" }} />
    </MessageButtonWrapper>
  );
};

export default MessageButton;

const MessageButtonWrapper = styled(TextButton)`
  border-radius: 3px;
  padding: 0px 5px;
  cursor: pointer;
  gap: 3px;
`;
