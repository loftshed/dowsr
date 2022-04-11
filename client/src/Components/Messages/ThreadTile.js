import styled from "styled-components";
import { CenteredFlexColumnDiv, FlexDiv } from "../../Styling/StyledComponents";
import { SIZES } from "../../Styling/constants";
import { useWindowWidth } from "@react-hook/window-size";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { getUser } from "../Auth/userHelpers";

const ThreadTile = ({ threadId, userId, user, time, message }) => {
  const { setDisplayedThreadId, displayedThreadId, threads } =
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

  return (
    <TileWrapper
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
          <Body>
            {message}
            <Timestamp>{dayjs(time).fromNow()}</Timestamp>
          </Body>
        </>
      )}
    </TileWrapper>
  );
};

export default ThreadTile;

const Avatar = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const TileWrapper = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: ${(props) => (props.small ? "fit-content" : "fit-content")};
  min-height: fit-content;
  background-color: var(--color-darkest-grey);
  border-radius: ${(props) => (props.small ? "50px" : "5px")};
  border: ${(props) =>
    props.small
      ? "1.5px solid var(--color-less-dark-grey)"
      : "1px solid var(--color-super-dark-grey)"};
  box-shadow: inset 0px 0px 2px var(--color-super-dark-grey);
  &:hover {
    outline: solid 1px var(--color-teal);
  }
  &:active {
    outline: solid 2px var(--color-teal);
  }
  cursor: pointer;
`;
/* margin: ${(props) => (props.small ? "2px" : "0px")}; */
/* @media (max-width: 425px) {
    width: 30px;
  } */

const Heading = styled(FlexDiv)`
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

const Body = styled(FlexDiv)`
  flex-direction: column;
  padding: 3px 5px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  /* overflow: hidden; */
`;

const Timestamp = styled.div`
  align-self: flex-end;
  font-size: 12px;
`;
