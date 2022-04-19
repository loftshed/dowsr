import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { startThreadWithUser } from "../../Messaging/helpers";
import { SendIcon } from "../../../styling/react-icons";
import { ProfileButton } from "../sharedstyles";

// STRETCH: get this to send the user to the chat page but don't start a thread with the user until they actually send them a message.

const MessageButton = ({ _id }) => {
  const locallyStoredUserId = localStorage.getItem("userId");
  const locallyStoredUsername = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <MessageButtonWrapper
      onClick={async () => {
        try {
          await startThreadWithUser(
            locallyStoredUserId,
            _id,
            "👋",
            locallyStoredUsername
          );
          navigate("/messages", { replace: true });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Text>Message</Text>
      <SendIcon style={{ display: "inline" }} />
    </MessageButtonWrapper>
  );
};

export default MessageButton;

const MessageButtonWrapper = styled(ProfileButton)``;
const Text = styled.div``;
