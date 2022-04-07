import styled from "styled-components";
import ResponsiveContainer from "./ResponsiveContainer";
import AlertModal from "./AlertModal";
import { SIZES } from "../styles/constants";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
} from "../styles/StyledComponents";

const Notifications = () => {
  return (
    <ResponsiveContainer heading={"Notifications"}>
      <NotificationContainer>
        <AlertModal>@coolguy69 added you as a friend!</AlertModal>
        <AlertModal>2 people liked your contribution 😎</AlertModal>
        <AlertModal>rain coming soon in your area!</AlertModal>
      </NotificationContainer>
    </ResponsiveContainer>
  );
};

export default Notifications;

const NotificationContainer = styled(CenteredFlexColumnDiv)`
  padding: ${SIZES.universalPadding}px;
  border-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
