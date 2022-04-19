import styled from "styled-components";
import { fillSpace } from "../../../../../styling/sharedstyles";

const PinStreetView = ({ popupInfo, apiKey }) => {
  return (
    <PinStreetViewWrapper
      href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo?.latitude},${popupInfo?.longitude}`}
      target="_new"
    >
      <StreetView
        id="street-view"
        src={`https://maps.googleapis.com/maps/api/streetview?size=225x125&location=${popupInfo?.latitude},${popupInfo?.longitude}&fov=80&heading=70&pitch=0&key=${apiKey}`}
      />
    </PinStreetViewWrapper>
  );
};
export default PinStreetView;

const PinStreetViewWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  ${fillSpace}
`;

const StreetView = styled.img`
  border-radius: 5px;
  outline: 1px solid var(--color-super-dark-grey);
`;
