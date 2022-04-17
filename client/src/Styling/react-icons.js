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
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsConeStriped,
} from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { IoLogOut, IoSend } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import { FaToilet, FaPoop } from "react-icons/fa";
import {
  MdPedalBike,
  MdCoffee,
  MdLocalGroceryStore,
  MdFilterAlt,
  MdAdminPanelSettings,
  MdLocalPolice,
} from "react-icons/md";
import { BiTrafficCone } from "react-icons/bi";
import {
  RiPoliceCarFill,
  RiMapPinAddFill,
  RiCloseCircleFill,
} from "react-icons/ri";
import { GiPoliceBadge } from "react-icons/gi";

const CircledArrowRight = styled(BsArrowRightCircleFill)``;
const SearchIcon = styled(BsSearch)``;
const InboxIcon = styled(BsFillInboxFill)``;
const HeartIcon = styled(BsHeartFill)``;
const SavedIcon = styled(BsFillSaveFill)``;
const NotificationIcon = styled(BsFillBellFill)``;
const ChatIcon = styled(BsFillChatDotsFill)``;
const ProfileIcon = styled(BsPersonCircle)``;
const MapIcon = styled(BsMapFill)``;
const LogoutIcon = styled(IoLogOut)``;
const SendIcon = styled(IoSend)``;
const FilterIcon = styled(MdFilterAlt)``;
const BikeIcon = styled(MdPedalBike)``;
const CoffeeIcon = styled(MdCoffee)``;
const HazardIcon = styled(BsConeStriped)``;
const PoliceIcon = styled(GiPoliceBadge)``;
const StoreIcon = styled(MdLocalGroceryStore)``;
const CreatePinIcon = styled(RiMapPinAddFill)``;
const CloseIcon = styled(RiCloseCircleFill)``;
const WaterIcon = styled(IoIosWater)``;
const ToiletIcon = styled(FaPoop)``;
const AdminIcon = styled(MdAdminPanelSettings)``;
const BurgerMenuIcon = styled(TiThMenu)``;
const ThumbsUpIcon = styled(BsFillHandThumbsUpFill)``;
const ThumbsDownIcon = styled(BsFillHandThumbsDownFill)``;

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
  BikeIcon,
  CoffeeIcon,
  HazardIcon,
  PoliceIcon,
  StoreIcon,
  FilterIcon,
  CreatePinIcon,
  CloseIcon,
  WaterIcon,
  ToiletIcon,
  AdminIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
};
