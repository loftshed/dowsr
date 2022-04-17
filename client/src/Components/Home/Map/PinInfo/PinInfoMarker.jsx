import { useContext } from "react";
import { MappingContext } from "../MappingContext";
import { Marker } from "react-map-gl";
import UniversalMapPin from "../UniversalMapPin";
import {
  StoreIcon,
  CoffeeIcon,
  PoliceIcon,
  HazardIcon,
  BikeIcon,
  FilterIcon,
  WaterIcon,
  ToiletIcon,
} from "../../../../styling/react-icons";

const PinInfoMarker = ({ pins, setPopupInfo }) => {
  const { setPopupIsVisible, popupIsVisible } = useContext(MappingContext);
  // Switch statement to determine which icon to use for the pin.
  const getIcon = (type) => {
    switch (type) {
      case "deps":
        return <StoreIcon />;
      case "cafes":
        return <CoffeeIcon />;
      case "popo":
        return <PoliceIcon />;
      case "hazard":
        return <HazardIcon />;
      case "shops":
        return <BikeIcon />;
      case "water":
        return <WaterIcon />;
      case "toilet":
        return <ToiletIcon />;
      default:
        return <></>;
    }
  };

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
