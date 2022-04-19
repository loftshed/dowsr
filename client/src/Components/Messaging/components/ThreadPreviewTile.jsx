import styled from "styled-components";
import { centeredFlexColumn, fillSpace } from "../../../styling/sharedstyles";
import { SIZES } from "../../../styling/constants";

import { useContext, useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import dayjs from "dayjs";

import { AppContext } from "../../../AppContext";
import { getUser } from "../../Auth/helpers";
import {
  gradientScroll,
  fadeIn,
  RefreshAnim,
} from "../../../styling/animations";

import socketio from "socket.io-client";

const ThreadPreviewTile = ({ threadId, userId, user, time, message }) => {
  const { setDisplayedThreadId, displayedThreadId, showLoadingAnim } =
    useContext(AppContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [partnerHandle, setPartnerHandle] = useState("");
  const collapseToAvatar = useWindowWidth({ wait: 5 }) <= SIZES.widthMin;
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const socket = socketio.connect("http://localhost:8080");
  // listens for a specific event from the server
  // socket.on(`${threadId}`, (message) => {
  //   console.log(message);
  //   setDisplayedThreadId(threadId);
  //   setCurrentMessages([...currentMessages, message]);
  // });

  useEffect(() => {
    (async () => {
      const { data } = await getUser("id", userId);
      const { avatarUrl, username } = data;
      setAvatarUrl(avatarUrl);
      setPartnerHandle(username);
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
        <Avatar src={avatarUrl} />
      ) : (
        <>
          <Heading>
            <Avatar src={avatarUrl} style={{ width: "20px", height: "20px" }} />
            {partnerHandle}
          </Heading>
          <Body>
            <Text isLoading={showLoadingAnim}>
              {message}
              <Timestamp>{dayjs(time).fromNow()}</Timestamp>
            </Text>

            {
              // show the loading animation if the thread has just received a new message

              showLoadingAnim && (
                <ThreadRefreshBoundary>
                  <RefreshAnim />
                </ThreadRefreshBoundary>
              )
            }
          </Body>
        </>
      )}
    </TileWrapper>
  );
};

export default ThreadPreviewTile;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 5px;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isLoading ? "0%" : "100%")};
`;

const ThreadRefreshBoundary = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
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
  animation: ${fadeIn} 0.3s forwards ease;
`;

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
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 14px;
`;

const Timestamp = styled.div`
  align-self: flex-end;
  font-size: 12px;
`;
