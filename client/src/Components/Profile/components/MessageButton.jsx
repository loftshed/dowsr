import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { startThreadWithUser } from "../../Messaging/helpers";
import { SendIcon } from "../../../styling/react-icons";
import { ProfileButton } from "../sharedstyles";

// STRETCH: get this to send the user to the chat page but don't start a thread with the user until they actually send them a message.

const MessageButton = ({ loggedInUser, _id }) => {
  const navigate = useNavigate();
  return (
    <MessageButtonWrapper
      onClick={async () => {
        try {
          const result = await startThreadWithUser(
            loggedInUser._id,
            _id,
            "👋",
            loggedInUser.username
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
