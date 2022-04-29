import styled from "styled-components/macro";
import { centeredFlexRow } from "../../../../styling/sharedstyles";
import { getDistanceFromPoint } from "../../helpers";
import { getIcon } from "../../helpers";

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
  z-index: 1;
  ${centeredFlexRow}
  gap: 2px;
  svg {
    fill: ${(props) => props.color};
  }
`;
