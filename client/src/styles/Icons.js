import styled from "styled-components";
import {
  BsArrowRightCircleFill,
  BsPersonCircle,
  BsBookmarkHeartFill,
  BsFillBellFill,
  BsFillInboxFill,
  BsHeartFill,
  BsFillChatDotsFill,
  BsSearch,
} from "react-icons/bs";

const CircledArrowRight = styled(BsArrowRightCircleFill)`
  width: 30px;
  height: 30px;
`;

const SearchIcon = styled(BsSearch)`
  width: 30px;
  height: 30px;
`;

const InboxIcon = styled(BsFillInboxFill)`
  width: 30px;
  height: 30px;
`;

const HeartIcon = styled(BsHeartFill)`
  width: 30px;
  height: 30px;
`;

const SavedHeartIcon = styled(BsBookmarkHeartFill)`
  width: 30px;
  height: 30px;
`;

export { CircledArrowRight, SearchIcon, InboxIcon, HeartIcon, SavedHeartIcon };
