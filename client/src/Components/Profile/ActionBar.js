import MessageButton from "./MessageButton";
import FollowButton from "./FollowButton";
import styled from "styled-components";
import { sharedDetailStyle } from "./sharedstyles";

const ActionBar = ({ loggedInUser, _id }) => {
  return (
    <ActionBarWrapper>
      <MessageButton loggedInUser={loggedInUser} _id={_id} />
      <FollowButton loggedInUser={loggedInUser} _id={_id} />
    </ActionBarWrapper>
  );
};

export default ActionBar;

const ActionBarWrapper = styled.div`
  justify-content: space-between;
  ${sharedDetailStyle}
`;
