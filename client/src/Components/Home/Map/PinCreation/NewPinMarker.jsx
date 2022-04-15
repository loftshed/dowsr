import styled from "styled-components";
import NewPinIcon from "./NewPinIcon";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { MappingContext } from "../MappingContext";
import NewPinPopup from "./NewPinPopup";

const NewPinMarker = () => {
  const { clickedLocation } = useContext(MappingContext);

  return (
    <Marker
      longitude={clickedLocation?.lng}
      latitude={clickedLocation?.lat}
      color="red"
    >
      <NewPinPopup clickedLocation={clickedLocation} />
    </Marker>
  );
};

export default NewPinMarker;
