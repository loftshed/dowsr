import styled from "styled-components";
import { Marker } from "react-map-gl";

const NewPinMarker = ({ clickedLocation }) => {
  return (
    <Marker
      longitude={clickedLocation?.lng}
      latitude={clickedLocation?.lat}
      color="red"
    >
      {/* <Pin
        onClick={() => {
          // setPopupInfo(pin);
        }}
      /> */}
    </Marker>
  );
};

export default NewPinMarker;
