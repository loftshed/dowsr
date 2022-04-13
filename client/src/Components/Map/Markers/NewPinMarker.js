import styled from "styled-components";
import NewPin from "../Pins/NewPin";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { MappingContext } from "../../../Context/MappingContext";

const NewPinMarker = ({ clickedLocation }) => {
  // const {} = useContext(MappingContext);

  return (
    <Marker
      longitude={clickedLocation?.lng}
      latitude={clickedLocation?.lat}
      color="red"
    >
      {/* <NewPin onClick={() => {
                setPopupInfo(pin);
              }} /> */}
    </Marker>
  );
};

export default NewPinMarker;
