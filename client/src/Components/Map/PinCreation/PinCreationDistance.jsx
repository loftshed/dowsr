import styled from "styled-components/macro";
import { centeredFlexRow } from "../../../styling/sharedstyles";
import { getDistanceFromPoint } from "../helpers";

const PinCreationDistance = ({ lat, lng, userLocation }) => {
  const distanceFromUser = getDistanceFromPoint(
    { lat: lat, lng: lng },
    { lat: userLocation.lat, lng: userLocation.lng }
  );
  const kmFromUser = (distanceFromUser * 100).toFixed(2);

  return (
    <PinCreationDistanceWrapper>
      {kmFromUser} km away
    </PinCreationDistanceWrapper>
  );
};
export default PinCreationDistance;

const PinCreationDistanceWrapper = styled.div`
  top: 5px;
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  position: absolute;
  z-index: 2;
  ${centeredFlexRow}
  gap: 2px;
`;
