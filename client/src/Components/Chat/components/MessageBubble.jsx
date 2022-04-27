import styled, { useTheme } from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Bubble = ({ recd, author, content, timestamp }) => {
  // This still feels a bit messy. ....way she goes.
  const navigate = useNavigate();
  const theme = useTheme();

  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime); // Used to display time in "(x) minutes ago" format

  return (
    <BubbleWrapper>
      <MessageContainer recd={recd}>
        <Heading recd={recd}>
          {recd && (
            <ProfileLink
              onClick={(ev) => {
                navigate(`/profile/${author}`);
              }}
            >
              @{author}
            </ProfileLink>
          )}
        </Heading>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {recd && <Tip src="/tip-received.svg" recd={recd} />}
          <Body recd={recd}>
            {content}
            <Timestamp>{dayjs(timestamp).format("MMM D, hh:mma")}</Timestamp>
          </Body>
          {!recd && <Tip src="/tip-sent.svg" />}
        </div>
      </MessageContainer>
    </BubbleWrapper>
  );
};

export default Bubble;
const ProfileLink = styled.div`
  all: inherit;
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${(props) => props.theme.colors.pink};
  }
`;

const Tip = styled.img`
  align-self: flex-end;
  width: 10px;
  margin: ${(props) =>
    props.recd ? "0px 0px -2px -9px" : "0px -9px -2px 0px"};
`;

const BubbleWrapper = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1px 7.5px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  font-family: Karla;
  font-weight: 800;
  color: #0c211d;
  text-transform: lowercase;
  font-size: 14px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: ${(props) => (props.recd ? "0px 2px 2px 2px" : "0px 3px")};
`;

///
/* background-color: ${(props) =>
    props.recd ? "${(props) => props.theme.colors.darkBlue}" : "${(props) => props.theme.colors.medBlue}"}; */
const Body = styled.div`
  display: flex;
  word-wrap: break-word;
  font-family: Karla;
  font-weight: 400;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 16px;
  padding: 3px 7px;
  border-radius: 3px;
  background-color: ${(props) => (props.recd ? "#46494c" : "#343a40")};
  outline: 1px solid ${(props) => props.theme.colors.darkGrey};
`;

////
//  /* background-color: ${(props) =>
//  props.recd ? "${(props) => props.theme.colors.medBlue}" : "${(props) => props.theme.colors.darkGrey}"};
const MessageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  padding: 3px;

  background-color: ${(props) =>
    props.recd ? props.theme.colors.teal : "#cfdbd5"};
  border-radius: 3px;
  align-self: ${(props) => (props.recd ? "flex-start" : "flex-end")};
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  /* outline: 1px solid ${(props) => props.theme.colors.superDarkGrey}; */
`;

const Timestamp = styled.div`
  display: flex;
  font-size: 10px;
  align-self: flex-end;
  color: ${(props) => props.theme.colors.extraMediumGrey};
`;
