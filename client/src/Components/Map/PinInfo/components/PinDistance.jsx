import styled from "styled-components";
import { centeredFlexRow } from "../../../../styling/sharedstyles";
import { getDistanceFromPoint } from "../../helpers";

const PinDistance = ({ popupInfo, userLocation }) => {
  const distanceFromUser = getDistanceFromPoint(
    { lat: +popupInfo?.latitude, lng: +popupInfo?.longitude },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  return <PinDistanceWrapper>{kmFromUser} km away</PinDistanceWrapper>;
};
export default PinDistance;

const PinDistanceWrapper = styled.div`
  top: 5px;
  background-color: var(--color-dark-grey);
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid var(--color-super-dark-grey);
  position: absolute;
  ${centeredFlexRow}
`;
