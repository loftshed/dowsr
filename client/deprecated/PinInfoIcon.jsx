import { memo } from "react";
import UniversalMapPin from "../src/components/Home/Map/UniversalMapPin";
import { ToiletIcon } from "../src/styling/react-icons";

const PinInfoIcon = ({ scale = 30, onClick }) => {
  return (
    <UniversalMapPin scale={0.5} onClick={onClick}>
      <ToiletIcon />
    </UniversalMapPin>
  );
};

export default memo(PinInfoIcon);
