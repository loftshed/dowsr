import styled from "styled-components";
import { centeredFlexColumn } from "../../../styling/sharedstyles";
import { fadeIn, RefreshAnim } from "../../../styling/animations";
import { SIZES } from "../../../styling/constants";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { getUser } from "../../Auth/helpers";
import { getOneThread } from "../helpers";

const PreviewTile = ({
  partnerId,
  threadId,
  message,
  time,
  selectedThreadId,
  setSelectedThreadId,
  showLoadingAnim,
  setCurrentMessages,
}) => {
  const [partner, setPartner] = useState(null);
  const collapseView = useWindowWidth({ wait: 5 }) <= SIZES.widthMin;
  const isCurrentlySelected = selectedThreadId === threadId ? true : false;
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  // Each thread preview tile should listen for a socket event to update the thread tile when a new message is received

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUser("id", partnerId);
        setPartner(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [partnerId]);

  const handleSelectThread = async (threadId) => {
    try {
      const returnedThread = await getOneThread(threadId);
      setCurrentMessages(returnedThread);
      setSelectedThreadId(threadId);
    } catch (error) {
      console.log(error);
    }
  };

  if (partner && collapseView === false)
    return (
      <TileWrapper
        onClick={(ev) => {
          handleSelectThread(threadId);
        }}
        showOutline={isCurrentlySelected}
      >
        <Heading>
          <Avatar
            src={partner.avatarUrl}
            style={{ width: "20px", height: "20px" }}
          />
          {partner.username}
        </Heading>
        <Body>
          <Text isLoading={showLoadingAnim}>
            {message}
            <Timestamp>{dayjs(time).fromNow()}</Timestamp>
          </Text>
          {showLoadingAnim && (
            <ThreadRefreshBoundary>
              <RefreshAnim />
            </ThreadRefreshBoundary>
          )}
        </Body>
      </TileWrapper>
    );

  if (partner && collapseView === true)
    return (
      <TileWrapper
        small={true}
        onClick={(ev) => {
          handleSelectThread(threadId);
        }}
        showOutline={isCurrentlySelected}
      >
        <Avatar src={partner.avatarUrl} />
      </TileWrapper>
    );
};

export default PreviewTile;

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
