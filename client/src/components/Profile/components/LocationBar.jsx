import { sharedDetailStyle } from "../sharedstyles";
import { RiGlobeLine as GlobeIcon } from "react-icons/ri";
import Flag from "react-world-flags";
import styled from "styled-components/macro";
import { fakeStroke } from "../../../styling/sharedstyles";

const LocationBar = ({ country, city, region }) => {
  return (
    <LocationBarWrapper>
      <Flag code={country} height={15} />
      <GlobeIcon />
      {region !== null && <>{`${city}, ${region}`}</>}
      {!region && <>{city}</>}
    </LocationBarWrapper>
  );
};

export default LocationBar;

const LocationBarWrapper = styled.div`
  ${sharedDetailStyle}
  font-weight: 700;
`;
