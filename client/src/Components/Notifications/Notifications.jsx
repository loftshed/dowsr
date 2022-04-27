import styled from "styled-components";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
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
  padding: ${(props) => props.theme.sizes.universalPadding}px;
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
