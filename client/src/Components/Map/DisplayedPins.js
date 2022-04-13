import { useContext } from "react";
import { MappingContext } from "../../Context/MapContext";
import { Marker } from "react-map-gl";
import Pin from "./Pin";

const DisplayedPins = ({ pins }) => {
  const setPopupInfo = useContext(MappingContext);
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
            onClick={(ev) => {
              console.log(ev);
            }}
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

export default DisplayedPins;
