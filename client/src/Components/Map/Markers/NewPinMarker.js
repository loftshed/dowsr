import styled from "styled-components";
import NewPin from "../Pins/NewPin";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { MappingContext } from "../../../Context/MappingContext";
import ConfirmPinPopup from "../Popups/ConfirmPinPopup";

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
