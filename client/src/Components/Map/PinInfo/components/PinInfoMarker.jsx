import { Marker } from "react-map-gl";
import UniversalMapPin from "../../UniversalMapPin";
import { getIcon } from "../../helpers";
import { PendingIcon } from "../../../../styling/react-icons";
import styled from "styled-components/macro";

const PinInfoMarker = ({ pins, setPopupInfo }) => {
  // Switch statement to determine which icon to use for the pin.

  return (
    <>
      {pins.map((pinData) => {
        // console.log(pinData);
        const type = pinData.type;
        return (
          <Marker
            key={`marker-${pinData._id}`}
            longitude={pinData?.longitude}
            latitude={pinData?.latitude}
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
              {pinData.pendingReview && (
                <Pending>
                  <PendingIcon />
                </Pending>
              )}
            </UniversalMapPin>
          </Marker>
        );
      })}
    </>
  );
};

export default PinInfoMarker;

const Pending = styled.div`
  svg {
    padding: 3px;
    background-color: ${(props) => props.theme.colors.darkGrey};
    border-radius: 50%;
    position: absolute;
    top: -15px;
    fill: ${(props) => props.theme.colors.mediumGrey};
  }
`;
