import styled from "styled-components";
import {
  BsArrowRightCircleFill,
  BsPersonCircle,
  BsFillBellFill,
  BsFillInboxFill,
  BsHeartFill,
  BsFillChatDotsFill,
  BsSearch,
  BsMapFill,
  BsFillSaveFill,
} from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { IoLogOut, IoSend } from "react-icons/io5";

const CircledArrowRight = styled(BsArrowRightCircleFill)``;
const SearchIcon = styled(BsSearch)``;
const InboxIcon = styled(BsFillInboxFill)``;
const HeartIcon = styled(BsHeartFill)``;
const SavedIcon = styled(BsFillSaveFill)``;
const NotificationIcon = styled(BsFillBellFill)``;
const ChatIcon = styled(BsFillChatDotsFill)``;
const ProfileIcon = styled(BsPersonCircle)``;
const MapIcon = styled(BsMapFill)``;
const BurgerMenuIcon = styled(TiThMenu)`
  filter: drop-shadow(1px 1px 1px var(--color-pink));
  width: 30px;
  height: 30px;
`;
const LogoutIcon = styled(IoLogOut)``;
const SendIcon = styled(IoSend)``;

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
  BurgerMenuIcon,
  LogoutIcon,
  SendIcon,
};
