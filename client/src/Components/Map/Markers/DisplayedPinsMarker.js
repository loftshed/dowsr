import { useContext } from "react";
import { MappingContext } from "../MappingContext";
import { Marker } from "react-map-gl";
import Pin from "../Pins/Pin";

const DisplayedPinsMarker = ({ pins, setPopupInfo }) => {
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
            <Pin
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

export default DisplayedPinsMarker;
