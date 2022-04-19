import { useContext } from "react";
import { MappingContext } from "../../MappingContext";
import { Marker } from "react-map-gl";
import UniversalMapPin from "../../UniversalMapPin";
import { getIcon } from "../../helpers";
import styled from "styled-components";

const PinInfoMarker = ({ pins, setPopupInfo }) => {
  const { setPopupIsVisible, popupIsVisible } = useContext(MappingContext);
  // Switch statement to determine which icon to use for the pin.

  return (
    <>
      {pins.map((pinData) => {
        const type = pinData.type;
        return (
          <Marker
            key={`marker-${pinData._id}`}
            longitude={pinData?.longitude}
            latitude={pinData?.latitude}
            color={"var(--color-pink)"}
            style={{ cursor: "pointer" }}
          >
            <UniversalMapPin
              onClick={(ev) => {
                ev.stopPropagation();
                setPopupInfo(pinData);
              }}
            >
              {getIcon(type)}
            </UniversalMapPin>
          </Marker>
        );
      })}
    </>
  );
};

export default PinInfoMarker;

const MapMarker = styled(Marker)``;
