import { useContext } from "react";
import { MappingContext } from "../../../Context/MappingContext";
import { Marker } from "react-map-gl";
import Pin from "../Pins/Pin";

const DisplayedPinsMarker = ({ pins }) => {
  const { setPopupInfo } = useContext(MappingContext);
  return (
    <>
      {pins.map((pin) => {
        return (
          <Marker
            key={`marker-${pin._id}`}
            longitude={pin.longitude}
            latitude={pin.latitude}
            color={"var(--color-pink)"}
            style={{ cursor: "pointer" }}
          >
            <Pin
              onClick={() => {
                setPopupInfo(pin);
              }}
            />
          </Marker>
        );
      })}
    </>
  );
};

export default DisplayedPinsMarker;
