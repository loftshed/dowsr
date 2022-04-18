import styled from "styled-components";

const PinStreetView = ({ popupInfo }) => {
  const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  <PinStreetViewWrapper
    href={`http://maps.google.com/maps?q=&layer=c&cbll=${popupInfo.latitude},${popupInfo.longitude}`}
    target="_new"
  >
    <StreetView
      id="street-view"
      src={`https://maps.googleapis.com/maps/api/streetview?size=200x75&location=${popupInfo.latitude},${popupInfo.longitude}&fov=80&heading=70&pitch=0&key=${REACT_APP_GOOGLE_API_KEY}`}
    />
  </PinStreetViewWrapper>;
};
export default PinStreetView;

const PinStreetViewWrapper = styled.a``;

const StreetView = styled.img`
  border-radius: 10px;
  border: 2px solid var(--color-pink);
`;
