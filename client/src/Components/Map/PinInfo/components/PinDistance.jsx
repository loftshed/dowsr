import styled from "styled-components/macro";
import { centeredFlexRow } from "../../../../styling/sharedstyles";
import { getDistanceFromPoint } from "../../helpers";
import { getIcon } from "../../helpers";
import dayjs from "dayjs";
import { FaClock } from "react-icons/fa";
import { BsDash } from "react-icons/bs";

const PinDistance = ({ popupInfo, userLocation }) => {
  const distanceFromUser = getDistanceFromPoint(
    { lat: +popupInfo?.latitude, lng: +popupInfo?.longitude },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  return (
    <PinDistanceWrapper color={`var(--color-${popupInfo.type})`}>
      {getIcon(popupInfo.type)}
      {kmFromUser} km away
      <DashIcon />
      <ClockIcon />
      {(popupInfo.type === "water" || popupInfo.type === "toilet") && (
        <Hours>{popupInfo.hours}</Hours>
      )}
      {(popupInfo.type === "police" || popupInfo.type === "hazard") && (
        <Hours>{dayjs(popupInfo.hours).fromNow()}</Hours>
      )}
    </PinDistanceWrapper>
  );
};
export default PinDistance;

const PinDistanceWrapper = styled.div`
  top: 5px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  position: absolute;
  ${centeredFlexRow}
  gap: 4px;
  svg {
    fill: ${(props) => props.color};
  }
  z-index: 1;
  line-height: 1.3;
`;

const Hours = styled.div``;

const DashIcon = styled(BsDash)`
  fill: ${(props) => props.theme.colors.superDarkGrey} !important;
  stroke: ${(props) => props.theme.colors.mediumGrey} !important;
  stroke-width: 1px !important;
`;

const ClockIcon = styled(FaClock)`
  fill: ${(props) => props.theme.colors.lightGrey} !important;
  stroke: ${(props) => props.theme.colors.mediumGrey} !important;
  stroke-width: 1px !important;
`;
