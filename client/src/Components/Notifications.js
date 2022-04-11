import styled from "styled-components";
import ResponsiveContainer from "../Styling/ResponsiveContainer";
import { SIZES } from "../Styling/constants";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
} from "../Styling/StyledComponents";

const Notifications = () => {
  return (
    <ResponsiveContainer heading={"Notifications"}>
      <NotificationContainer>
        notifications go here, in theory!
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
