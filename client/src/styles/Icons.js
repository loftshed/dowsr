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
import { SIZES } from "./constants";

const CircledArrowRight = styled(BsArrowRightCircleFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const SearchIcon = styled(BsSearch)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const InboxIcon = styled(BsFillInboxFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const HeartIcon = styled(BsHeartFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const SavedIcon = styled(BsFillSaveFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const NotificationIcon = styled(BsFillBellFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const ChatIcon = styled(BsFillChatDotsFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const ProfileIcon = styled(BsPersonCircle)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
`;

const MapIcon = styled(BsMapFill)`
  width: ${SIZES.iconSize}px;
  height: ${SIZES.iconSize}px;
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
