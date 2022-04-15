import { useContext } from "react";
import { MappingContext } from "../MappingContext";
import { Marker } from "react-map-gl";
import PinInfoIcon from "./PinInfoIcon";

const PinInfoMarker = ({ pins, setPopupInfo }) => {
  const { setPopupIsVisible, popupIsVisible } = useContext(MappingContext);

  return (
    <>
      {pins.map((pinData) => {
        return (
          <Marker
            key={`marker-${pinData._id}`}
            longitude={pinData?.longitude}
            latitude={pinData?.latitude}
            color={"var(--color-pink)"}
            style={{ cursor: "pointer" }}
          >
            <PinInfoIcon
              onClick={(ev) => {
                ev.stopPropagation();
                setPopupInfo(pinData);
              }}
            />
          </Marker>
        );
      })}
    </>
  );
};

export default PinInfoMarker;
