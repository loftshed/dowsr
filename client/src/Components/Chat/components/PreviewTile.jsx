import styled, { useTheme } from "styled-components";
import { centeredFlexColumn } from "../../../styling/sharedstyles";
import { fadeIn, RefreshAnim } from "../../../styling/animations";

import dayjs from "dayjs";
import { /*useContext,*/ useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { getUser } from "../../Auth/helpers";
import { getOneThread } from "../helpers";
// import { AppContext } from "../../../AppContext";

const PreviewTile = ({
  partnerId,
  threadId,
  message,
  time,
  selectedThreadId,
  setSelectedThreadId,
  showLoadingAnim,
  setCurrentMessages,
  currentMessages,
}) => {
  const theme = useTheme();
  const [partner, setPartner] = useState(null); // Chat partner user object
  const collapseView = useWindowWidth({ wait: 5 }) <= theme.sizes.widthMin; // If window is less than
  // useWindowWidth({ wait: 5 }) <= 500; // If window is less than 500px wide, collapse view
  const isCurrentlySelected = selectedThreadId === threadId ? true : false; // Used to determine if the tile should be highlighted
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime); // Used to display time in "(x) minutes ago" format

  useEffect(() => {
    (async () => {
      try {
        // Get the partner user's object which will be used to populate the tile with data
        if (!partnerId) return;
        const { data } = await getUser("id", partnerId);
        setPartner(data); // Set the partner object to the state
      } catch (error) {
        console.log(error);
      }
    })();
  }, [partnerId]);

  const handleSelectThread = async (threadId) => {
    try {
      // Uses the threadId to get the thread object from the database
      // Also records the threadId in the state so that the tile can be highlighted
      const returnedThread = await getOneThread(threadId);
      setCurrentMessages(returnedThread);
      setSelectedThreadId(threadId);
    } catch (error) {
      console.log(error);
    }
  };

  // If collapseView is false display desktop/tablet sized view
  if (partner && collapseView === false)
    return (
      <TileWrapper
        onClick={(ev) => {
          handleSelectThread(threadId);
        }}
        showOutline={isCurrentlySelected} // Shows border if selected
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

  // If collapseView is true display mobile sized view
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
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: ${(props) => (props.small ? "50px" : "5px")};
  border: ${(props) =>
    props.small
      ? `1.5px solid ${props.theme.colors.lessDarkGrey}`
      : `1px solid ${props.theme.colors.superDarkGrey}`};
  box-shadow: ${(props) =>
    props.showOutline
      ? `inset 0px 0px 2px ${props.theme.colors.superDarkGrey}, 0px 2px 1px ${props.theme.colors.pink}`
      : `inset 0px 0px 2px ${props.theme.colors.superDarkGrey}`};
  &:hover {
    outline: solid 2px ${(props) => props.theme.colors.teal};
  }
  &:active {
    outline: solid 2px ${(props) => props.theme.colors.pink};
  }
  cursor: pointer;
  outline: ${(props) =>
    props.showOutline ? `2px solid ${props.theme.colors.teal}` : ""};
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
  background-color: ${(props) => props.theme.colors.almostDarkestBlue};
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
