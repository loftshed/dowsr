import styled from "styled-components/macro";
import { SIZES } from "../../../styling/constants";
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
  height: 40px;
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-less-dark-grey);
  padding: 0 ${SIZES.universalPadding}px;
`;
