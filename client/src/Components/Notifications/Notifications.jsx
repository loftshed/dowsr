import styled from "styled-components";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { SIZES } from "../../styling/constants";
import { centeredFlexColumn } from "../../styling/sharedstyles";

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

const NotificationContainer = styled.div`
  ${centeredFlexColumn}
  padding: ${SIZES.universalPadding}px;
  border-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
