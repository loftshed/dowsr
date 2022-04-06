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
  BsMapFill,
  BsFillSaveFill,
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

const SavedIcon = styled(BsFillSaveFill)`
  width: 30px;
  height: 30px;
`;

const NotificationIcon = styled(BsFillBellFill)`
  width: 30px;
  height: 30px;
`;

const ChatIcon = styled(BsFillChatDotsFill)`
  width: 30px;
  height: 30px;
`;

const ProfileIcon = styled(BsPersonCircle)`
  width: 30px;
  height: 30px;
`;

const MapIcon = styled(BsMapFill)`
  width: 30px;
  height: 30px;
`;

export {
  CircledArrowRight,
  SearchIcon,
  InboxIcon,
  HeartIcon,
  SavedIcon,
  NotificationIcon,
  ChatIcon,
  ProfileIcon,
  MapIcon,
};
