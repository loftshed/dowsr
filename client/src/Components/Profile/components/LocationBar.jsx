import { sharedDetailStyle } from "../sharedstyles";
import { RiGlobeLine as GlobeIcon } from "react-icons/ri";
import Flag from "react-world-flags";
import styled from "styled-components/macro";

const LocationBar = ({ country, city, region }) => {
  return (
    <LocationBarWrapper>
      <Flag code={country} height={16} />
      <GlobeIcon />
      {`${city}, ${region}`}
    </LocationBarWrapper>
  );
};

export default LocationBar;

const LocationBarWrapper = styled.div`
  ${sharedDetailStyle}
`;
