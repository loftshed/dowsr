import styled from "styled-components/macro";
import MessageButton from "./MessageButton";

const MessageBar = ({ loggedInUser, _id, isOwnProfile }) => {
  return (
    <MessageBarWrapper>
      {!isOwnProfile && <MessageButton loggedInUser={loggedInUser} _id={_id} />}
    </MessageBarWrapper>
  );
};

export default MessageBar;

const MessageBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 35px;
  border-bottom-left-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  padding: 0 ${(props) => props.theme.sizes.universalPadding}px;
`;
