import styled from "styled-components";
import { centeredFlexColumn } from "../../Styling/StyledComponents";
import { SIZES } from "../../Styling/constants";

import { useContext, useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import dayjs from "dayjs";

import { AppContext } from "../../Context/AppContext";
import { getUser } from "../Auth/userHelpers";
import LoadingSpinner from "../Etc/LoadingSpinner";
import { gradientScroll } from "../../Styling/Animations";

const ThreadTile = ({ threadId, userId, user, time, message }) => {
  const { setDisplayedThreadId, displayedThreadId, showLoadingAnim } =
    useContext(AppContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const collapseToAvatar = useWindowWidth({ wait: 5 }) <= SIZES.widthMin;
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  useEffect(() => {
    (async () => {
      const { data } = await getUser("id", userId);
      const { avatarUrl } = data;
      setAvatarUrl(avatarUrl);
    })();
  }, []);

  if (!avatarUrl) return null;

  return (
    <TileWrapper
      showOutline={displayedThreadId === threadId}
      small={collapseToAvatar}
      onClick={(ev) => {
        setDisplayedThreadId(threadId);
      }}
    >
      {collapseToAvatar ? (
        <>
          <Avatar src={avatarUrl} />
        </>
      ) : (
        <>
          <Heading>
            <Avatar src={avatarUrl} style={{ width: "20px", height: "20px" }} />
            {user}
          </Heading>
          <Body overflow={showLoadingAnim}>
            {showLoadingAnim ? (
              <ThreadRefreshBoundary>
                <ThreadRefreshAnim />
              </ThreadRefreshBoundary>
            ) : (
              // <LoadingSpinner color="#353535" />
              <>
                {message}
                <Timestamp>{dayjs(time).fromNow()}</Timestamp>
              </>
            )}
          </Body>
        </>
      )}
    </TileWrapper>
  );
};

export default ThreadTile;

const ThreadRefreshBoundary = styled.div`
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
`;

const ThreadRefreshAnim = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(231, 67, 106, 1) 0%,
    rgba(109, 31, 50, 0.4947092563291139) 100%
  );

  height: 200%;
  width: 500px;
  animation: ${gradientScroll} 0.5s linear infinite;
`;

const Avatar = styled.img`
  width: 50px;
  border-radius: 300px;
`;

const TileWrapper = styled.div`
  ${centeredFlexColumn}
  transition: 0.08s all linear;
  width: 100%;
  height: fit-content;
  background-color: var(--color-darkest-grey);
  border-radius: ${(props) => (props.small ? "50px" : "5px")};
  border: ${(props) =>
    props.small
      ? "1.5px solid var(--color-less-dark-grey)"
      : "1px solid var(--color-super-dark-grey)"};
  box-shadow: ${(props) =>
    props.showOutline
      ? "inset 0px 0px 2px var(--color-super-dark-grey), 0px 2px 1px var(--color-pink)"
      : "inset 0px 0px 2px var(--color-super-dark-grey)"};
  &:hover {
    outline: solid 2px var(--color-teal);
  }
  &:active {
    outline: solid 2px var(--color-pink);
  }

  cursor: pointer;
  outline: ${(props) =>
    props.showOutline ? "2px solid var(--color-teal)" : ""};
`;
/* margin: ${(props) => (props.small ? "2px" : "0px")}; */
/* @media (max-width: 425px) {
    width: 30px;
  } */

const Heading = styled.div`
  display: flex;
  align-items: center;
  font-family: Karla;
  font-size: 16px;
  gap: 4px;
  width: 100%;
  padding: 3px 5px;
  background-color: var(--color-almost-darkest-blue);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: ${(props) => (props.overflow ? "none" : "3px 5px")};
  width: 100%;
  height: 100%;
  font-size: 14px;

  overflow: ${(props) => (props.overflow ? "hidden" : "auto")};
`;

const Timestamp = styled.div`
  align-self: flex-end;
  font-size: 12px;
`;
