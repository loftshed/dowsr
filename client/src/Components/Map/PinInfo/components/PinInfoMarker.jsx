import { useContext } from "react";
import { MappingContext } from "../../MappingContext";
import { Marker } from "react-map-gl";
import UniversalMapPin from "../../UniversalMapPin";
import { getIcon } from "../../helpers";
import styled from "styled-components";

const PinInfoMarker = ({ pins, setPopupInfo }) => {
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
              color={`var(--color-${type})`}
              type={type}
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
