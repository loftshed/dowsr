import styled from "styled-components";
import {
  centeredFlexColumn,
  fillSpace,
} from "../../../../../styling/sharedstyles";

const PinStreetView = ({ popupInfo, apiKey }) => {
  return (
    <PinStreetViewWrapper>
      <LinkToView
        href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo?.latitude},${popupInfo?.longitude}`}
        target="_new"
      >
        <StreetView
          id="street-view"
          src={`https://maps.googleapis.com/maps/api/streetview?size=235x125&location=${popupInfo?.latitude},${popupInfo?.longitude}&fov=80&heading=70&pitch=0&key=${apiKey}`}
        />
      </LinkToView>
    </PinStreetViewWrapper>
  );
};
export default PinStreetView;

const PinStreetViewWrapper = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
  padding:3px;
`;

const LinkToView = styled.a``;

const StreetView = styled.img`
  border-radius: 5px;
  outline: 1px solid var(--color-super-dark-grey);
`;
