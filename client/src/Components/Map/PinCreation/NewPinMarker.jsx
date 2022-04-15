import styled from "styled-components";
import NewPin from "../PinCreation/NewPin";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { MappingContext } from "../MappingContext";
import ConfirmPinPopup from "./ConfirmPinPopup";

const NewPinMarker = () => {
  const { clickedLocation } = useContext(MappingContext);

  return (
    <Marker
      longitude={clickedLocation?.lng}
      latitude={clickedLocation?.lat}
      color="red"
    >
      <ConfirmPinPopup clickedLocation={clickedLocation} />
    </Marker>
  );
};

export default NewPinMarker;
