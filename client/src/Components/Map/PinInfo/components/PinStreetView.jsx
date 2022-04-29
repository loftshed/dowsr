import styled from "styled-components/macro";
import { fadeIn } from "../../../../styling/Animations";
import {
  centeredFlexColumn,
  fillSpace,
} from "../../../../styling/sharedstyles";

const PinStreetView = ({ popupInfo, apiKey }) => {
  return (
    <PinStreetViewWrapper>
      <LinkToView
        href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo?.latitude},${popupInfo?.longitude}`}
        target="_new"
      >
        <LoadingFiller />
        <StreetView
          id="street-view"
          src={`https://maps.googleapis.com/maps/api/streetview?size=225x125&location=${popupInfo?.latitude},${popupInfo?.longitude}&fov=80&heading=70&pitch=0&key=${apiKey}`}
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

const LinkToView = styled.a`
  position: relative;
`;

const LoadingFiller = styled.div`
  display: flex;
  position: relative;
  width: 225px;
  height: 125px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.darkGrey};
`;

const StreetView = styled.img`
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 5px;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  width: 225px;
  height: 125px;
  animation: ${fadeIn} 0.2s ease;
`;
